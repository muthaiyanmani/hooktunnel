# HookTunnel  

HookTunnel is a lightweight CLI tool for proxying webhook requests from Git providers (**GitHub, GitLab, Bitbucket**) in internal or intranet environments. It automatically forwards webhook messages using **ngrok**, enabling seamless development and testing.  

## Installation  

Ensure you have **Node.js** and **npm** installed before proceeding. Then, install HookTunnel globally using npm:  

```sh
npm install -g hooktunnel
```  

Or use it without installation via **npx**:  

```sh
npx hooktunnel --help
```  

## Usage  

To use HookTunnel, provide the **ngrok authentication token**, **server port**, **target URL**, and optionally the **ngrok domain**. These can be passed as command-line arguments or set as environment variables.  

🔑 **Get your ngrok authentication token [here](https://dashboard.ngrok.com/get-started/your-authtoken).**  

### **CLI Usage**  

```sh
npx hooktunnel --token <NGROK_AUTH_TOKEN> --port <SERVER_PORT> --target <TARGET_URL> --ngrok-domain <NGROK_DOMAIN>
```  

### **Environment Variables**  

| Variable                 | Description                        | Required |
|--------------------------|------------------------------------|----------|
| **HC_NGROK_AUTH_TOKEN**  | ngrok authentication token        | ✅       |
| **HC_TARGET_URL**        | Target URL                        | ✅       |
| **HC_PORT**              | Server port (optional)            | ❌       |
| **HC_NGROK_DOMAIN**      | ngrok custom domain (optional)    | ❌       |  

### **Example Usage**  

```sh
hooktunnel --token YOUR_AUTH_TOKEN --port 3000 --target http://localhost:3000
```  

## Contributing  

We welcome contributions! If you find an issue or have a feature request, please open an [issue](https://github.com/muthaiyanmani/hook-tunnel/issues) on GitHub.  
