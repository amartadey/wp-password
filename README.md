# WordPress Password Hash Generator

A modern, client-side WordPress password hash generator with multiple useful tools for WordPress developers and administrators.

## 🌟 Features

- **Password Hash Generator** - Generate WordPress-compatible bcrypt password hashes
- **SQL Query Builder** - Create ready-to-use SQL queries for password resets
- **PHP Emergency Script** - Generate emergency password reset scripts
- **Secure Password Generator** - Create strong, random passwords
- **Password Strength Checker** - Real-time password strength analysis
- **100% Client-Side** - All processing happens in your browser, passwords never leave your device

## 🚀 Live Demo

[View Live Demo](https://yourusername.github.io/wp-password-tool/)

## 📦 Installation

### GitHub Pages Deployment

1. Fork this repository
2. Go to Settings → Pages
3. Select `main` branch as source
4. Your site will be published at `https://yourusername.github.io/wp-password-tool/`

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/wp-password-tool.git

# Navigate to directory
cd wp-password-tool

# Open in browser
open index.html
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with glassmorphism effects
- **JavaScript (ES6+)** - Client-side logic
- **bcrypt.js** - WordPress-compatible password hashing
- **Iconify** - Beautiful icon system
- **Google Fonts (Inter)** - Modern typography

## 📖 Usage

### Generate Password Hash

1. Enter your desired password
2. Click "Generate Hash"
3. Copy the generated hash
4. Paste it into phpMyAdmin's `user_pass` field (with no function selected)

### Create SQL Query

1. Enter username and new password
2. Set table prefix (default: `wp_`)
3. Click "Generate SQL Query"
4. Copy and run the query in phpMyAdmin

### Emergency Reset Script

1. Enter user ID (usually `1` for admin)
2. Enter new password
3. Click "Generate PHP Script"
4. Save as `reset-password.php` in WordPress root
5. Visit the file once in browser
6. **DELETE THE FILE IMMEDIATELY**

## 🔒 Security

- All password hashing is done client-side in your browser
- No passwords are sent to any server
- Uses bcrypt algorithm (same as WordPress)
- Open source - you can verify the code yourself

## 🎨 Features

- ✨ Modern glassmorphism UI
- 🌙 Dark theme optimized
- 📱 Fully responsive design
- ⚡ Fast and lightweight
- 🎯 No dependencies (except bcrypt.js CDN)
- 🔄 Smooth animations and transitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**WebGraphicsHub**
- Website: [webgraphicshub.com](https://webgraphicshub.com)
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- WordPress for the password hashing algorithm
- bcrypt.js for the JavaScript implementation
- Iconify for the beautiful icons

## ⚠️ Disclaimer

This tool is provided as-is for educational and development purposes. Always backup your database before making changes. The authors are not responsible for any data loss or security issues.

---

Made with ❤️ for WordPress Developers
