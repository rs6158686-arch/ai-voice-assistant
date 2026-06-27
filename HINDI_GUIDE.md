# 🎤 हिंदी में AI Voice Assistant - पूरी गाइड

## नमस्ते! 👋

आपका **AI Voice Assistant** अब पूरी तरह **हिंदी** में तैयार है! 🇮🇳

---

## 🚀 शुरुआत कैसे करें

### Step 1: .env फाइल में यह डालें

```env
# Backend Configuration
DEBUG=true
HOST=0.0.0.0
PORT=8000
DEFAULT_LANGUAGE=hi-IN

# OpenAI API Key
OPENAI_API_KEY=sk-xxx...xxx

# CORS
CORS_ORIGINS=["http://localhost:3000","http://localhost:5000"]

# Voice Configuration
SAMPLE_RATE=16000
CHUNK_SIZE=2048
MAX_RECORD_SECONDS=30

# AI Model
MODEL_NAME=gpt-3.5-turbo
MAX_TOKENS=500
TEMPERATURE=0.7

# System Control
ALLOW_SYSTEM_COMMANDS=true
ALLOWED_APPS=["notepad","calculator","chrome","firefox","vscode"]

# Frontend
FRONTEND_URL=http://localhost:3000
```

### Step 2: Application शुरू करें

#### Docker के साथ (सबसे आसान):
```bash
docker-compose up
```

#### या मैनुअली:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend-web
npm start
```

### Step 3: Browser में खोलें

```
http://localhost:3000
```

---

## 🎙️ हिंदी में Commands के उदाहरण

### 📚 सामान्य सवाल (General Questions):

```
"नमस्ते, आप कैसे हो?"
"आज का मौसम कैसा है?"
"भारत की राजधानी क्या है?"
"एक जोक सुनाओ"
"15 * 25 का जवाब क्या है?"
"Machine Learning क्या है?"
"Web Development कैसे सीखूँ?"
```

### 🖥️ System Commands:

```
"Chrome खोलो"
"VS Code खोलो"
"Visual Studio Code खोल दे"
"Calculator खोलो"
"Notepad खोलो"
"Settings खोलो"
"Terminal खोलो"
"Firefox खोल दे"
```

### 📝 और उदाहरण:

```
"अभी क्या समय है?"
"मेरे लिए एक प्रो��ेक्ट आइडिया दो"
"Python से क्या बना सकते हैं?"
"मुझे तुम्हारे बारे में बताओ"
"आप किस भाषा में बात करते हो?"
"मेरी मदद कर सकते हो?"
```

---

## ⚙️ Features (विशेषताएं)

### 1. 🎤 Voice-to-Text (आवाज़ को टेक्स्ट में)
- **Real-time transcription** - तुरंत काम करता है
- **High accuracy** - बहुत सटीक
- **Multiple languages** - कई भाषाएं
- **Google Speech Recognition** - गूगल की शक्ति

### 2. 🤖 AI Chat (बुद्धिमान जवाब)
- **Context-aware** - पिछली बातें याद रखता है
- **OpenAI GPT** - बेहतरीन AI
- **Natural responses** - प्राकृतिक जवाब
- **Fast processing** - तेज़ स्पीड

### 3. 💻 System Control (सिस्टम नियंत्रण)
- **Open applications** - एप्स खोलना
- **Execute commands** - कमांड चलाना
- **Launch files** - फाइलें खोलना
- **System info** - सि��्टम की जानकारी

### 4. 🎨 Beautiful Interface (सुंदर UI)
- **Modern design** - नया डिज़ाइन
- **Dark/Light theme** - थीम बदल सकते हो
- **Responsive** - सभी डिवाइस पर काम करता है
- **Easy to use** - आसान है

---

## 🎯 Voice Recording के Best Practices

### ✅ करें:

1. **स्पष्ट बोलें** - साफ़ हिंदी में
   ```
   ❌ "क्रोम...ओ...पन" 
   ✅ "Chrome खोलो"
   ```

2. **शांत जगह चुनें** - कम शोर हो
   ```
   ❌ बाज़ार में रिकॉर्ड करना
   ✅ घर में शांत कमरे से
   ```

3. **माइक्रोफोन की ओर मुँह करें** - सीधा बोलें
   ```
   ❌ माइक से दूर हटकर
   ✅ सीधे सामने से बोलें
   ```

4. **पूरे वाक्य बोलें** - अधूरा न रखें
   ```
   ❌ "Chrome... खो... दे"
   ✅ "Chrome खोल दे"
   ```

### ❌ न करें:

1. **बहुत तेज़ी से बोलना** - धीमी स्पीड रखें
2. **फुसफुसाते हुए बोलना** - जोर से बोलें
3. **अपने आप को बीच में काटना** - पूरा बोलें
4. **शोर वाली जगह से** - शांत जगह चुनें

---

## ⌨️ Keyboard Shortcuts (कीबोर्ड शॉर्टकट)

| Shortcut | काम | उदाहरण |
|----------|------|----------|
| `Enter` | Message भेजें | Message लिखकर Enter दबाएं |
| `Shift + Enter` | नई लाइन | Text को नई लाइन में ले जाएं |
| `Ctrl + Shift + D` | Chat साफ़ करें | सभी messages delete करें |
| `Ctrl + Shift + S` | Settings खोलें | सेटिंग्स page खोलें |

---

## 🛠️ Settings कैसे करें

### 1. **भाषा (Language) बदलें**
   - Settings → भाषा → हिंदी चुनें
   - Voice recording में हिंदी का उपयोग होगा

### 2. **थीम (Theme) बदलें**
   - Settings → थीम → Light/Dark चुनें
   - आँखों को आराम देने के लिए Dark mode

### 3. **API URL सेट करें**
   - अगर backend अलग सर्वर पर है
   - Settings में URL डालें

### 4. **सिस्टम Info देखें**
   - Settings में अपना OS, CPU, Memory देख सकते हो

---

## 🌍 समर्थित भाषाएँ

| Language Code | भाषा | Flag |
|---------------|------|------|
| `hi-IN` | हिंदी | 🇮🇳 |
| `en-US` | English (US) | 🇺🇸 |
| `en-GB` | English (UK) | 🇬🇧 |
| `es-ES` | Spanish | 🇪🇸 |
| `fr-FR` | French | 🇫🇷 |
| `de-DE` | German | 🇩🇪 |
| `it-IT` | Italian | 🇮🇹 |
| `ja-JP` | Japanese | 🇯🇵 |
| `zh-CN` | Chinese | 🇨🇳 |
| `pt-BR` | Portuguese | 🇧🇷 |
| `ru-RU` | Russian | 🇷🇺 |

---

## ❓ Troubleshooting (समस्याओं का समाधान)

### समस्या 1: Microphone काम नहीं कर रहा 🎤

**समाधान:**
```
1. Browser की permissions चेक करें
2. Settings → Microphone को Allow करें
3. Page को Refresh करें (Ctrl + R)
4. System settings में माइक्रोफोन चेक करें
```

### समस्या 2: Voice को समझ नहीं पा रहा 🔇

**समाधान:**
```
1. स्पष्ट हिंदी में बोलें
2. शांत जगह से रिकॉर्ड करें
3. माइक्रोफोन अच्छा हो
4. Internet connection तेज़ हो
```

### समस्या 3: OpenAI API Error ⚠️

**समाधान:**
```
1. API key सही है या नहीं चेक करें
2. .env file में सही डालें
3. Backend को restart करें
4. OpenAI account में usage check करें
```

### समस्या 4: Backend से connection नहीं हो रहा 🌐

**समाधान:**
```
1. Backend port 8000 पर चल रहा है?
2. python main.py से start करें
3. CORS_ORIGINS सेट है?
4. .env file ठीक है?
```

---

## 💡 उपयोगी सुझाव

### 🎯 Tip 1: Natural Language बोलें
```
❌ गलत: "notepad open"
✅ सही: "Notepad खोलो" या "नोटपैड खोल दे"
```

### 🎯 Tip 2: Context दें
```
❌ गलत: "Project ideas?"
✅ सही: "मैं Python सीख रहा हूँ, मुझे एक बड़ा project दो"
```

### 🎯 Tip 3: Commands chain करें
```
1. Chrome खोलो
2. Google में जाओ
3. कुछ सर्च करो
```

### 🎯 Tip 4: Conversation history रखें
```
✓ Assistant को पिछली बातें याद रहती हैं
✓ उसी context में और सवाल पूछें
```

### 🎯 Tip 5: Settings customize करें
```
✓ अपनी भाषा चुनें
✓ थीम सेट करें
✓ API URL configure करें
```

---

## 🔐 Privacy & Security (गोपनीयता)

```
✓ Voice data locally process होता है
✓ Chat history browser में save होती है
✓ OpenAI API के through secure communication
✓ कोई तीसरा पक्ष को data नहीं मिलता
✓ आप किसी भी समय chat clear कर सकते हो
```

---

## 📞 Help & Support (मदद)

### अगर समस्या हो:

1. **यह गाइड फिर से पढ़ें**
2. **GitHub Issues देखें**
3. **नया Issue बनाएं**
4. **FAQ section चेक करें**

### Contact:
```
GitHub: https://github.com/rs6158686-arch/ai-voice-assistant
Issues: https://github.com/rs6158686-arch/ai-voice-assistant/issues
```

---

## 🎉 Ready to Go!

### अब आपके पास है:

✅ **हिंदी Voice Support** - अपनी भाषा में बोलें  
✅ **AI Chat** - बुद्धिमान जवाब  
✅ **System Control** - अपने PC को नियंत्रित करें  
✅ **Beautiful UI** - सुंदर इंटरफेस  
✅ **Fast & Secure** - तेज़ और सुरक्षित  

---

## 🚀 शुरू करने के लिए तैयार!

```bash
# Docker के साथ
docker-compose up

# फिर खोलें
http://localhost:3000
```

### और बस! आपका Personal AI Assistant तैयार है! 🎤🇮🇳

**Happy Voice Assisting! हैप्पी वॉयस असिस्टिंग! 🎉**

---

*Made with ❤️ for Hindi speakers*
