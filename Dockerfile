FROM python:3.9
ENV PYTHONUNBUFFERED True
WORKDIR /app
COPY . ./
RUN pip install google-cloud-storage
RUN pip install tensorflow-intel
RUN pip install --no-cache-dir -r requirements.txt
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app



