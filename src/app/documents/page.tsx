"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// 使用动态导入来确保客户端渲染
const TiptapEditor = dynamic(() => import("@/components/TiptapEditor").then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="p-4 h-screen flex flex-col">
      <div className="h-14 mb-4">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="h-12 mb-8">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[8.5in] max-w-full p-8">
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-5/6 mb-6" />
          <Skeleton className="h-24 w-full mb-4" />
        </div>
      </div>
    </div>
  )
});

const initialContent = `
<h1>欢迎使用现代化文档编辑器</h1>
<p>这是一个功能丰富的编辑器，支持以下功能:</p>
<ul>
  <li>文本格式化 (粗体, 斜体, 下划线等)</li>
  <li>标题 (H1, H2, H3)</li>
  <li>字体样式和大小调整</li>
  <li>文本颜色和高亮</li>
  <li>列表和表格</li>
</ul>
<p>开始编辑吧!</p>
`;

export default function DocumentPage() {
  const [content, setContent] = useState(initialContent);

  const handleContentUpdate = (html: string) => {
    setContent(html);
    // 这里可以添加自动保存功能
  };

  return (
    <TiptapEditor
      content={content}
      onUpdate={handleContentUpdate}
    />
  );
} 