# Use an official Python runtime as a parent image
FROM python:3.10-slim

WORKDIR /service

COPY ./service /service

RUN pip install fastapi uvicorn

COPY ./service/requirements.txt /tmp/requirements.txt

RUN pip install -r /tmp/requirements.txt

