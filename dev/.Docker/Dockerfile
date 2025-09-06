FROM nvidia/cuda:12.9.1-cudnn-devel-ubuntu24.04

ENV MINICONDA_HOME=/opt/miniconda3
ENV PATH=$MINICONDA_HOME/bin:$PATH

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common \
    wget \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Miniconda
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh && \
    chmod +x miniconda.sh && \
    ./miniconda.sh -b -p $MINICONDA_HOME && \
    rm miniconda.sh

RUN conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/main
RUN conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/r
# Initialize conda and create environment
RUN conda init bash && \
    conda config --set channel_priority strict

COPY dev-env.yml /tmp/dev-env.yml
RUN conda env create -f /tmp/dev-env.yml && conda clean -afy

# Set up shell and environment
SHELL ["/bin/bash", "-c"]
RUN echo "conda activate dev-env" >> ~/.bashrc
ENV CONDA_DEFAULT_ENV=dev-env


CMD ["/bin/bash", "-c", "source ~/.bashrc && conda activate dev-env && bash"]

