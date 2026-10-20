async function diagnose() {
  try {
    const res = await fetch("http://localhost:3000/");
    const html = await res.text();
    console.log("HTML length:", html.length);
    const cssMatches = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)].map(m => m[1]);
    console.log("CSS files linked:", cssMatches);
    for (const cssPath of cssMatches) {
      const url = cssPath.startsWith("http") ? cssPath : `http://localhost:3000${cssPath}`;
      const cssRes = await fetch(url);
      const cssText = await cssRes.text();
      console.log(`\n--- Inspecting ${cssPath} (length: ${cssText.length}) ---`);
      console.log("First 200 chars:", cssText.slice(0, 200));
      console.log("Includes '@tailwind'?", cssText.includes("@tailwind"));
      console.log("Includes 'tailwind'?", cssText.includes("tailwind"));
      console.log("Includes 'neu-card'?", cssText.includes("neu-card"));
      console.log("Includes 'flex'?", cssText.includes("flex"));
      console.log("Includes 'bg-background'?", cssText.includes("bg-background"));
    }
  } catch (err) {
    console.error("Error diagnosing:", err);
  }
}
diagnose();
