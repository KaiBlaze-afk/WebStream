import cv2
import requests
import numpy as np
# Set up the video capture
cap = cv2.VideoCapture(0)  # Use 0 for default webcam
# Server URL
url = 'http://localhost:3000/'
# Loop to capture and stream video
while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Convert the frame to a byte array
    _, img_encoded = cv2.imencode('.jpg', frame)
    img_bytes = img_encoded.tobytes()

    # Set up the payload for the POST request
    files = {'image': ('image.jpg', img_bytes, 'image/jpeg')}
    data = {'somekey': 'somevalue'}

    # Send the POST request to the server
    response = requests.post(url, files=files, data=data)

    # # Display the video locally (optional)
    # cv2.imshow('Local Video', frame)

    # Break the loop if 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture object and close the window
cap.release()
cv2.destroyAllWindows()
