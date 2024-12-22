<div align="center">
    <a href="https://www.seoulsky.org">
      <img alt="hero" src="https://github.com/SeoulSKY/SeoulSKY/blob/main/assets/header.gif">
    </a>
    <h1>SeoulSKY</h1>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/Node.js-v21.7-84ba64" alt="nodejs">
    <img src="https://github.com/SeoulSKY/SeoulSKY.github.io/actions/workflows/lint.yml/badge.svg" alt="lint">
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
|--------------------------|----------------------------------------------------|
| VITE_EMAILJS_PUBLIC_KEY  | Public Key for [EmailJS](https://www.emailjs.com)  |
| VITE_EMAILJS_TEMPLATE_ID | Template ID for [EmailJS](https://www.emailjs.com) |

## How to Run

Run the following command

```bash
npm start
```

## How to Deploy to GitHub Pages

Run the following command to build

```bash
npm run build
```

Then, deploy

```bash
npm run deploy
```
