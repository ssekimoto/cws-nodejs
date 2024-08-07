FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/code-oss:latest

# 必要なパッケージのインストール
RUN sudo apt update && sudo apt install -y gettext-base jq httpie curl ghostscript

# 既存のNode.jsのアンインストール
RUN sudo apt-get remove -y nodejs

# 新しいNode.jsのインストール
ENV NODE_VERSION 21.11.1

RUN export ARCH=$(uname -m | sed 's/aarch64/arm64/' | sed 's/x86_64/x64/') \
 && curl -fsSLO --compressed "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" \
 && tar -xJf "node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
 && rm "node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" \
 && ln -s /usr/local/bin/node /usr/local/bin/nodejs

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
