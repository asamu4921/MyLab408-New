import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime, timedelta
import mysql.connector

# ---------- SETUP Wajah Dataset ----------
dataset_path = "dataset/"
known_encodings = []
known_names = []

for file in os.listdir(dataset_path):
    if file.endswith(".jpg") or file.endswith(".png"):
        path = os.path.join(dataset_path, file)
        img = face_recognition.load_image_file(path)
        encoding = face_recognition.face_encodings(img)
        if encoding:
            known_encodings.append(encoding[0])
            known_names.append(os.path.splitext(file)[0])


def get_jam():
    return datetime.now().strftime("%H:%M")


def get_tanggal():
    return datetime.now().strftime("%A, %d %B %Y")


# ---------- MAIN LOOP ----------
cap = cv2.VideoCapture(1)
cv2.namedWindow("Panel RTF.IV.4", cv2.WND_PROP_FULLSCREEN)
cv2.setWindowProperty("Panel RTF.IV.4", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

nama_dikenali = None
waktu_terakhir_dikenali = None

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    detected_now = None
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_encodings, face_encoding, tolerance=0.5)
        if True in matches:
            index = matches.index(True)
            detected_now = known_names[index]
            break

    if detected_now:
        nama_dikenali = detected_now
        waktu_terakhir_dikenali = datetime.now()
        # tampilkan_wajah_dikenali() akan dimasukkan nanti
    else:
        if nama_dikenali and waktu_terakhir_dikenali and (datetime.now() - waktu_terakhir_dikenali).seconds < 5:
            # tampilkan_wajah_dikenali() akan dimasukkan nanti
            pass
        else:
            nama_dikenali = None
            # tampilkan_panel() akan dimasukkan nanti
            pass

    # cv2.imshow dan keyboard handler di sini

    key = cv2.waitKey(1) & 0xFF
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()
