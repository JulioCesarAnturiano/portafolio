import cv2
import mediapipe as mp
import numpy as np
import math
import json
import time


# ==========================
# CONFIGURACIÓN GENERAL
# ==========================

FPS_TARGET = 30.0
OUTPUT_JSON = "motion_capture.json"
MAX_SECONDS = 10 

mp_pose = mp.solutions.pose
PoseLandmark = mp_pose.PoseLandmark


# ==========================
# DEFINICIÓN DE HUESOS
# ==========================
# cada hueso es (nombre, índice_landmark_padre, índice_landmark_hijo)
BONES = [
    ("hips", PoseLandmark.LEFT_HIP, PoseLandmark.RIGHT_HIP),

    ("spine", PoseLandmark.LEFT_HIP, PoseLandmark.LEFT_SHOULDER),
    ("chest", PoseLandmark.LEFT_SHOULDER, PoseLandmark.RIGHT_SHOULDER),

    ("upper_arm_L", PoseLandmark.LEFT_SHOULDER, PoseLandmark.LEFT_ELBOW),
    ("lower_arm_L", PoseLandmark.LEFT_ELBOW, PoseLandmark.LEFT_WRIST),

    ("upper_arm_R", PoseLandmark.RIGHT_SHOULDER, PoseLandmark.RIGHT_ELBOW),
    ("lower_arm_R", PoseLandmark.RIGHT_ELBOW, PoseLandmark.RIGHT_WRIST),

    ("upper_leg_L", PoseLandmark.LEFT_HIP, PoseLandmark.LEFT_KNEE),
    ("upper_leg_R", PoseLandmark.RIGHT_HIP, PoseLandmark.RIGHT_KNEE),
]


# ==========================
# FUNCIONES AUXILIARES
# ==========================
def smooth_quaternions(quats, window=4):

    smoothed = []
    n = len(quats)

    for i in range(n):
        start = max(0, i - window)
        end = min(n, i + window)
        segment = quats[start:end]

        # promedio componente a componente
        avg_w = sum(q[0] for q in segment) / len(segment)
        avg_x = sum(q[1] for q in segment) / len(segment)
        avg_y = sum(q[2] for q in segment) / len(segment)
        avg_z = sum(q[3] for q in segment) / len(segment)

        smoothed.append([avg_w, avg_x, avg_y, avg_z])
    return smoothed


def landmark_to_np(lm):
    return np.array([lm.x, lm.y, lm.z], dtype=np.float32)


def get_point(world_landmarks, idx):
    lm = world_landmarks[idx]
    return landmark_to_np(lm)


def safe_normalize(v):
    norm = np.linalg.norm(v)
    if norm < 1e-8:
        return np.zeros_like(v)
    return v / norm

def mediapipe_to_blender(v):

    x_mp, y_mp, z_mp = v[0], v[1], v[2]
    x_bl = x_mp
    y_bl = z_mp
    z_bl = -y_mp
    return np.array([x_bl, y_bl, z_bl], dtype=np.float32)


def quaternion_from_two_vectors(v_from, v_to):
    """
    construye un cuaternión que rota v_from en v_to.
    v_from y v_to deben estar normalizados.
    devuelve [w, x, y, z]
    """
    v_from_n = safe_normalize(v_from)
    v_to_n = safe_normalize(v_to)

    dot = np.dot(v_from_n, v_to_n)
    # clamp por seguridad numérica
    dot = max(min(dot, 1.0), -1.0)

    # si los vectores son casi iguales → sin rotación
    if dot > 0.999999:
        return [1.0, 0.0, 0.0, 0.0]

    # si son casi opuestos → rotación de 180º alrededor de un eje ortogonal
    if dot < -0.999999:
        # encontramos un vector ortogonal
        arbitrary = np.array([1.0, 0.0, 0.0], dtype=np.float32)
        if abs(v_from_n[0]) > 0.9:
            arbitrary = np.array([0.0, 1.0, 0.0], dtype=np.float32)
        axis = np.cross(v_from_n, arbitrary)
        axis = safe_normalize(axis)
        # rotación de pi radianes
        w = 0.0
        sin_half = 1.0  # sin(pi/2) = 1
        x, y, z = axis * sin_half
        return [w, float(x), float(y), float(z)]

    # ángulo vía producto punto
    theta = math.acos(dot)
    # eje vía producto cruz
    axis = np.cross(v_from_n, v_to_n)
    axis = safe_normalize(axis)

    half_theta = theta * 0.5
    w = math.cos(half_theta)
    sin_half = math.sin(half_theta)
    x, y, z = axis * sin_half

    return [float(w), float(x), float(y), float(z)]


def compute_bone_vectors(world_landmarks):
    """
    devuelve un diccionario:
      { nombre_hueso: vector_3d (child - parent) }
    usando ya coordenadas convertidas a blender.
    """
    bone_vectors = {}
    for name, p_idx, c_idx in BONES:
        
        p_mp = get_point(world_landmarks, p_idx)
        c_mp = get_point(world_landmarks, c_idx)

        
        p = mediapipe_to_blender(p_mp)
        c = mediapipe_to_blender(c_mp)

        v = c - p
        bone_vectors[name] = v

    return bone_vectors


# ==========================
# CAPTURA PRINCIPAL
# ==========================

def main():
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("no se pudo abrir la cámara.")
        return

    pose = mp_pose.Pose(
        static_image_mode=False,
        model_complexity=1,
        enable_segmentation=False,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5,
    )

    base_bone_vectors = None 
    frames_data = []         
    bones_names = [b[0] for b in BONES]

    start_time = time.time()
    last_frame_time = start_time
    frame_index = 0

    print("iniciando captura...")
    print("colócate en t-pose frente a la cámara para capturar la pose base.")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("no se pudo leer frame de la cámara.")
            break

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb)

        debug_frame = frame.copy()
        h, w, _ = debug_frame.shape

        if results.pose_landmarks:
            mp.solutions.drawing_utils.draw_landmarks(
                debug_frame,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS
            )

        cv2.putText(debug_frame, "presiona 'q' para terminar",
                    (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                    0.7, (0, 255, 0), 2)

        if base_bone_vectors is None:
            cv2.putText(debug_frame, "mantente en t-pose para capturar base",
                        (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                        0.7, (0, 255, 255), 2)
        else:
            cv2.putText(debug_frame, "capturando frames...",
                        (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                        0.7, (0, 255, 255), 2)

        cv2.imshow("captura mocap", debug_frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("fin de captura por tecla.")
            break

        if results.pose_world_landmarks and base_bone_vectors is None:
            world_lms = results.pose_world_landmarks.landmark
            base_bone_vectors = compute_bone_vectors(world_lms)
            print("pose base capturada.")
            continue

        if base_bone_vectors is None:
            continue

        now = time.time()
        elapsed = now - last_frame_time
        if elapsed < 1.0 / FPS_TARGET:
            continue

        last_frame_time = now

        if now - start_time > MAX_SECONDS:
            print("fin de captura por tiempo máximo.")
            break

        if results.pose_world_landmarks:
            world_lms = results.pose_world_landmarks.landmark
            current_vectors = compute_bone_vectors(world_lms)

            rotations = {}
            for name in bones_names:
                v_base = base_bone_vectors[name]
                v_curr = current_vectors[name]

                q = quaternion_from_two_vectors(v_base, v_curr)
                rotations[name] = q

            frame_data = {
                "time": frame_index / FPS_TARGET,
                "rotations": rotations
            }
            frames_data.append(frame_data)
            frame_index += 1

    cap.release()
    cv2.destroyAllWindows()
    pose.close()

    # ======================================
    # SUAVIZADO DE TODAS LAS ROTACIONES
    # ======================================
    if frames_data:
        num_frames = len(frames_data)

        # suavizar por hueso
        for bone in bones_names:
            # recopilar la rotación del hueso en cada frame
            quats = [frames_data[i]["rotations"][bone] for i in range(num_frames)]

            # aplicar suavizado
            quats_smooth = smooth_quaternions(quats, window=4)

            # sobrescribir rotaciones en frames_data
            for i in range(num_frames):
                frames_data[i]["rotations"][bone] = quats_smooth[i]

        # ======================================
        # GUARDAR JSON FINAL
        # ======================================
        data = {
            "framerate": FPS_TARGET,
            "bones": bones_names,
            "frames": frames_data
        }

        with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

        print(f"animacion guardada en '{OUTPUT_JSON}' con {len(frames_data)} frames (suavizada).")

    else:
        print("no se capturaron frames válidos, no se generó json.")


if __name__ == "__main__":
    main()
