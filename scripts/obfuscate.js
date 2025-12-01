import JavaScriptObfuscator from "javascript-obfuscator";
import fs from 'fs'
import path from "path";

const buildPath = path.join(process.cwd(), 'build/static/js');

if (!fs.existsSync(buildPath)) {
    console.error("❌ No se encontró la carpeta build/static/js");
    process.exit(1);
}

const files = fs.readdirSync(buildPath);

files.forEach(file => {
    if (file.endsWith('.js')) {
        const filePath = path.join(buildPath, file);
        const code = fs.readFileSync(filePath, 'utf8');

        const obfuscated = JavaScriptObfuscator.obfuscate(code, {
            compact: true,
            controlFlowFlattening: true,
            stringArray: true,
            rotateStringArray: true,
            stringArrayEncoding: ['base64'],
            deadCodeInjection: false
        });

        fs.writeFileSync(filePath, obfuscated.getObfuscatedCode());
        console.log(`🔒 Ofuscado: ${file}`);
    }
});