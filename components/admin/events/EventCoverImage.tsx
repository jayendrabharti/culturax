"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { PencilIcon, UploadIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/supabase/storage";
import { toast } from "sonner";
import { convertBlobUrlToFile } from "@/utils/utils";

async function getCroppedImg(
  image: HTMLImageElement,
  crop: PixelCrop
): Promise<string> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2d context");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        resolve(url);
      } else {
        reject(new Error("Canvas is empty"));
      }
    }, "image/png");
  });
}

interface EventCoverImageProps {
  onImageReady: (imageUrl: string) => void;
  initialImageUrl?: string;
  disabled?: boolean;
}

export default function EventCoverImage({
  onImageReady,
  initialImageUrl,
  disabled = false,
}: EventCoverImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialImageUrl || null
  );
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleOnImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSrc(URL.createObjectURL(file));
      setCrop(undefined);
      setCompletedCrop(null);
      setImageUrl(null);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    imgRef.current = e.currentTarget;
  };

  const handleCropComplete = async () => {
    setIsProcessing(true);
    try {
      if (!completedCrop) {
        toast.error("Please crop the image first!", {
          style: { background: "#ef4444", color: "#fff" },
        });
        return;
      }

      if (imgRef.current && completedCrop) {
        const croppedImageUrl = await getCroppedImg(
          imgRef.current,
          completedCrop
        );
        const imageFile = await convertBlobUrlToFile(croppedImageUrl);

        const { imageUrl: uploadedImageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "images", // Using "images" bucket as requested
        });

        if (error) {
          toast.error(`Error uploading image: ${error}`);
          return;
        }

        setImageUrl(uploadedImageUrl);
        onImageReady(uploadedImageUrl);
        toast.success("Cover image uploaded successfully!");
        setSrc(null);
      }
    } catch (error) {
      toast.error(
        `Error processing image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    setSrc(null);
    setCrop(undefined);
    setCompletedCrop(null);
    setImageUrl(initialImageUrl || null);
  };

  const handleUpdate = () => {
    setImageUrl(null);
    setSrc(null);
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto w-full">
        {!imageUrl && src ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-muted-foreground">
              (Crop the image to continue)
            </span>
            <ReactCrop
              crop={crop}
              onChange={setCrop}
              onComplete={setCompletedCrop}
              aspect={16 / 9} // Cover image aspect ratio
              minWidth={300}
              minHeight={169}
            >
              <Image
                ref={imgRef}
                src={src}
                alt="event-cover-image-cropper"
                width={1000}
                height={563}
                onLoad={onImageLoad}
                style={{ maxWidth: "100%" }}
                className="max-h-96 object-contain"
              />
            </ReactCrop>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                onClick={handleCropComplete}
                disabled={!completedCrop || isProcessing}
              >
                <UploadIcon />
                {isProcessing ? "Processing..." : "Crop & Upload"}
              </Button>
              <Button variant="destructive" onClick={handleCancel}>
                <XIcon />
                Cancel
              </Button>
            </div>
          </div>
        ) : imageUrl ? (
          <>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt="event-cover-image"
                width={600}
                height={338}
                className="w-full max-w-md rounded-lg object-cover aspect-video"
              />
            </div>
            <Button
              variant="outline"
              onClick={handleUpdate}
              className="mx-auto mt-2 w-full max-w-md"
            >
              <PencilIcon />
              Update Cover Image
            </Button>
          </>
        ) : (
          <>
            <div
              className={cn(
                "relative flex flex-col items-center justify-center overflow-hidden rounded-xl outline-4 outline-[--border] outline-dashed",
                "bg-card aspect-video max-w-md mx-auto"
              )}
            >
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleOnImageChange}
                disabled={disabled}
                className={cn(
                  "absolute h-full w-full opacity-0 cursor-pointer",
                  {
                    "cursor-not-allowed": disabled,
                  }
                )}
              />
              <UploadIcon className="m-4 size-16 text-[--muted-foreground]" />
              <span className="mx-4 mb-4 text-lg font-bold text-[--foreground] text-center">
                Upload Cover Image
              </span>
            </div>
            {initialImageUrl && (
              <Button
                variant="destructive"
                onClick={() => setImageUrl(initialImageUrl)}
                className="mx-auto mt-2 w-full max-w-md"
              >
                <XIcon />
                Reset to Original
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
