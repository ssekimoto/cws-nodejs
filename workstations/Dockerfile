FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/code-oss:latest

# 必要なパッケージのインストール
RUN sudo apt update && sudo apt install -y gettext-base jq httpie curl ghostscript

# 既存のNode.jsのアンインストール
RUN sudo apt-get remove -y nodejs

# 新しいNode.jsのインストール
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && \
    sudo apt-get install -y nodejs

# Node.jsのパッケージインストール
RUN sudo npm install -g jest \
    pg \
    @google-cloud/sql \
    sharp \
    express \
    axios \
    dotenv \
    nodemon

# Javascript Debugger extensionのインストール
RUN wget https://open-vsx.org/api/ms-vscode/js-debug/1.70.0/file/ms-vscode.js-debug-1.70.0.vsix && \
unzip ms-vscode.js-debug-1.70.0.vsix "extension/*" &&\
mv extension /opt/code-oss/extensions/javascript-debugger
