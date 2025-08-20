# 👏 Clap Detection System

[![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)](https://python.org)
[![Platform](https://img.shields.io/badge/Platform-Windows-brightgreen.svg)](https://microsoft.com/windows)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com)

A Python-based sound detection system that launches applications (VS Code, Cursor, etc.) when you clap your hands! Perfect for hands-free workflow automation.

![Demo](https://img.shields.io/badge/👏👏-Launch%20Apps-success?style=for-the-badge)

## 🚀 Features

- **Real-time clap detection** using advanced audio processing
- **Configurable sensitivity** and clap patterns
- **Multiple application support** (VS Code, Cursor, Notepad, Calculator, etc.)
- **Cooldown protection** to prevent accidental launches
- **Easy configuration** via JSON file
- **Windows optimized** with automatic path detection

## 📦 Installation

### Quick Setup (Recommended)
1. Run the setup script:
   ```batch
   setup.bat
   ```

### Manual Setup
1. **Install Python 3.7+** from [python.org](https://python.org) if not already installed

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **If PyAudio installation fails** (common on Windows):
   ```bash
   pip install pipwin
   pipwin install pyaudio
   ```
   
   Or download the wheel from [here](https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio) and install with:
   ```bash
   pip install PyAudio‑0.2.11‑cp39‑cp39‑win_amd64.whl
   ```

## 🎯 Usage

### Basic Usage
```bash
python clap_detector.py
```

The system will start listening for claps. By default:
- **2 quick claps** within 1 second will launch VS Code
- **2-second cooldown** prevents accidental triggers

### Stopping the System
Press `Ctrl+C` to stop the clap detector.

## 🔄 Auto-Startup (Always Running)

To make the clap detector start automatically when Windows boots:

### Option 1: Quick Setup (Recommended)
```batch
setup_autostart.bat
```
This adds the detector to your Windows startup folder.

### Option 2: Task Scheduler (Advanced)
```powershell
.\setup_task_scheduler.ps1
```
This creates a Windows scheduled task for more control.

### System Tray Version
For background operation, use the tray version:
```batch
py clap_detector_tray.py
```

**Features of the tray version:**
- 👏 Icon in system tray (near clock)
- Green icon = listening, Red icon = stopped
- Right-click for controls and settings
- Runs silently in background
- Auto-starts listening when launched

## ⚙️ Configuration

Edit `config.json` to customize the behavior:

```json
{
    "threshold": 0.02,          // Sensitivity (lower = more sensitive)
    "clap_duration": 0.1,       // Duration of a single clap (seconds)
    "cooldown_period": 2.0,     // Cooldown between activations (seconds)
    "required_claps": 2,        // Number of claps needed
    "clap_window": 1.0,         // Time window for claps (seconds)
    "default_app": "vscode",    // Default application to launch
    "applications": {           // Available applications
        "cursor": "cursor",
        "vscode": "code",
        "notepad": "notepad",
        "calculator": "calc"
    }
}
```

### Configuration Options Explained

- **threshold**: Audio sensitivity (0.01-0.1). Lower values = more sensitive
- **required_claps**: How many claps needed to trigger (1-5 recommended)
- **clap_window**: Maximum time between claps (0.5-2.0 seconds)
- **cooldown_period**: Minimum time between launches (1-5 seconds)
- **default_app**: Which application to launch by default

### Changing the Target Application

To launch Cursor instead of VS Code:
1. Open `config.json`
2. Change `"default_app": "vscode"` to `"default_app": "cursor"`
3. Save and restart the detector

### Adding New Applications

Add to the `applications` section in `config.json`:
```json
"applications": {
    "cursor": "cursor",
    "vscode": "code",
    "notepad": "notepad",
    "calculator": "calc",
    "chrome": "chrome",
    "firefox": "firefox"
}
```

## 🔧 Troubleshooting

### Common Issues

**1. PyAudio Installation Failed**
- Try: `pip install pipwin && pipwin install pyaudio`
- Or download wheel from [unofficial binaries](https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio)

**2. Microphone Not Detected**
- Check microphone permissions in Windows Settings
- Ensure microphone is set as default recording device
- Try running as administrator

**3. Application Won't Launch**
- Verify the application is installed and in PATH
- Check the application path in `config.json`
- For VS Code, ensure it's added to PATH during installation

**4. Too Sensitive/Not Sensitive Enough**
- Adjust `threshold` in `config.json`:
  - Too sensitive: Increase to 0.03-0.05
  - Not sensitive enough: Decrease to 0.01-0.015

**5. False Positives**
- Increase `required_claps` to 3 or more
- Increase `threshold` value
- Decrease `clap_window` to require faster claps

### Debug Mode

Run with verbose logging:
```bash
python clap_detector.py
```

Watch the console output to see when claps are detected and adjust settings accordingly.

## 🎵 How It Works

1. **Audio Capture**: Continuously captures audio from your microphone
2. **Signal Processing**: Uses high-pass filtering to isolate clap frequencies
3. **Pattern Detection**: Analyzes audio for sudden energy spikes characteristic of claps
4. **Timing Analysis**: Counts claps within the specified time window
5. **Application Launch**: Executes the configured application when pattern matches

## 📂 File Structure

```
clap-detector/
├── clap_detector.py    # Main detection script
├── config.json         # Configuration file
├── requirements.txt    # Python dependencies
├── setup.bat          # Windows setup script
└── README.md          # This file
```

## 🔐 Security & Privacy

- **Local Processing**: All audio processing happens locally on your machine
- **No Recording**: Audio is processed in real-time and never stored
- **No Network**: No data is sent over the internet
- **Microphone Access**: Only used for real-time clap detection

## 🚦 Performance Tips

- **Close unused applications** to improve detection accuracy
- **Use in quiet environment** for best results
- **Clap sharply** with a quick, crisp sound
- **Keep consistent distance** from microphone

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 📝 License

This project is open source and available under the MIT License.

## 🎉 Credits

Built with love using Python, NumPy, SciPy, and PyAudio.

---

**Happy Clapping! 👏**
