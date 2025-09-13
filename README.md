<div align="center">
    <a href="https://www.seoulsky.dev">
      <img alt="hero" src="https://github.com/user-attachments/assets/79ab15d1-5a2b-4784-a4a2-de7f5010e3cf">
    </a>
    <h1>SeoulSKY</h1>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/Node.js-v23.11-84ba64" alt="nodejs">
</div>

## How to Setup Development Environment

- Install [Node.js](https://nodejs.org/en/download/package-manager)
- Install required node packages

```bash
npm install
```

- Create a `.env` file, copy and paste all contents from the `.env.example` file, and fill in the values

### Description of Environment Variables

| Name                     | Description                                        |
| ------------------------ | -------------------------------------------------- |
| VITE_EMAILJS_PUBLIC_KEY  | Public Key for [EmailJS](https://www.emailjs.com)  |
| VITE_EMAILJS_TEMPLATE_ID | Template ID for [EmailJS](https://www.emailjs.com) |

## How to Run

Run the following command

```bash
npm start
```

## How to Deploy to GitHub Pages

Run the following command to build and deploy

```bash
npm run deploy
```
