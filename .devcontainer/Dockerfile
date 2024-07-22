# Start with a base Arch Linux image
FROM archlinux:latest

# Install systemd and other necessary packages
RUN pacman -Syu --noconfirm && \
    pacman -Sy --noconfirm base-devel python-pip openssh curl nano neovim git zsh wget unzip sudo cmake ninja clang llvm docker docker-compose && \
    rm -rf /var/cache/pacman/pkg/*

# Create a non-root user for AUR installations
RUN useradd -m -G wheel auruser && \
    echo "auruser ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/auruser

# Switch to non-root user and install yay for AUR package management
USER auruser
WORKDIR /home/auruser
RUN git clone https://aur.archlinux.org/yay.git && \
    cd yay && \
    makepkg -si --noconfirm && \
    cd /home/auruser && \
    rm -rf yay

# Install NVM and Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    nvm install --lts && \
    nvm alias default node && \
    nvm use default

# Install Node.js package managers
RUN yay -S --noconfirm pnpm yarn

# Switch back to root user
USER root

# Install Oh My Zsh for root and configure Zsh theme
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended && \
    sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="agnoster"/g' /root/.zshrc && \
    chsh -s /bin/zsh root

# Expose ports for debugging (optional)
EXPOSE 80 443 3000 4000 5432

# Optionally, set up a workspace directory
WORKDIR /workspace

# Clean up after installation
RUN rm -rf /var/cache/pacman/pkg/*

# Set environment variables for CMake
ENV CC=/usr/bin/clang
ENV CXX=/usr/bin/clang++

CMD ["tail", "-f", "/dev/null"]