// আপনার Hugging Face API Key এখানে দিন
const API_KEY = "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"; // আপনার আসল টোকেনটি এখানে পেস্ট করুন
const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

const promptInput = document.getElementById("prompt-input");
const generateBtn = document.getElementById("generate-btn");
const imageContainer = document.getElementById("image-container");
const loadingText = document.getElementById("loading-text");

generateBtn.addEventListener("click", async () => {
    const prompt = promptInput.value.trim();
    if (prompt === "") {
        alert("অনুগ্রহ করে একটি প্রম্পট লিখুন।");
        return;
    }

    // লোডিং টেক্সট দেখান এবং আগের ছবি মুছে ফেলুন
    loadingText.classList.remove("hidden");
    imageContainer.innerHTML = ''; // আগের ছবি মুছে ফেলার জন্য
    imageContainer.appendChild(loadingText);


    try {
        // API তে ডেটা পাঠান
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: prompt }),
        });

        if (!response.ok) {
            throw new Error(`সার্ভার থেকে সমস্যা হচ্ছে: ${response.statusText}`);
        }

        // API থেকে ইমেজ ডেটা (blob) গ্রহণ করুন
        const blob = await response.blob();
        
        // ইমেজ blob থেকে URL তৈরি করুন
        const imageUrl = URL.createObjectURL(blob);

        // নতুন ইমেজ এলিমেন্ট তৈরি করুন এবং দেখান
        const img = document.createElement("img");
        img.src = imageUrl;
        
        // লোডিং টেক্সট লুকিয়ে ফেলুন এবং ছবি দেখান
        loadingText.classList.add("hidden");
        imageContainer.innerHTML = ''; // লোডিং টেক্সট মুছে ফেলার জন্য
        imageContainer.appendChild(img);

    } catch (error) {
        console.error("Error:", error);
        loadingText.classList.add("hidden");
        imageContainer.innerHTML = '<p>দুঃখিত, ছবিটি তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</p>';
    }

});
