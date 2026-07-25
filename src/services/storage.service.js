import { db } from "@/libs/supabase";


const getFileExtension = (file) => {
    return file?.name?.split(".").pop()?.toLowerCase() || "jpg";
};

export async function uploadPaymentAttachment({ file, companyId, orderId, orderCode }) {
    
    if (!file) {
        return {
            path: null,
            url: null
        };
    }

    const extension = getFileExtension(file);
    const timestamp = Date.now();

    const fileName = `${orderCode}_${orderId}_${timestamp}.${extension}`;

    const filePath = `${companyId}/payment_attachment/${fileName}`;

    const { error: uploadError } = await db.storage
        .from("business")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type
        });

    if (uploadError) {
        throw uploadError;
    }

    const { data } = db.storage
        .from("business")
        .getPublicUrl(filePath);

    return {
        path: filePath,
        url: data.publicUrl
    };
}