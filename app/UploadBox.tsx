"use client";
import React, { useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import XHR from "@uppy/xhr-upload";
import Chinese from "@uppy/locales/lib/zh_CN";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const UploadBox = () => {
  let responseBody: any;
  let responseStatus: number;
  const router = useRouter();

  // IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.
  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        // 限制文件数量
        // maxNumberOfFiles: 2,
        // 限制文件大小
        maxFileSize: 5 * 1024 * 1024,
        // 限制上传格式
        allowedFileTypes: ["image/*"],
      },
    }).use(XHR, {
      endpoint: "http://localhost:3000/api/upload",
      // 获取respond信息
      async onAfterResponse(xhr) {
        responseBody = xhr.response;
        responseStatus = xhr.status;
      },
    }),
  );
  // 设置元数据
  // 这里可以设置上传文件时需要的额外参数，比如用户ID、文件类型等
  uppy.on("file-added", (file) => {
    uppy.setFileMeta(file.id, {
      size: file.size,
      path: `/upload/${file.name}`,
    });
  });
  // 设置语言
  uppy.setOptions({
    locale: Chinese,
  });
  // ---------------event
  // 上传成功
  uppy.on("upload-success", () => {
    // console.log(response);
    // 刷新当前路由(可选)
    router.refresh();
  });
  // 上传失败
  uppy.on("upload-error", () => {
    // 这里要与后端约定好返回的状态码
    // 409 表示文件已存在
    if (responseStatus === 409) {
      toast.error(responseBody);
    }
  });

  // 显示上传的所有数据
  // console.log(uppy.store.state);
  return (
    <>
      <Toaster position="top-center" />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dashboard uppy={uppy} />
      </div>
    </>
  );
};
export default UploadBox;
