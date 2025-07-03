"use client";

import { useState } from 'react';
import { ArrowLeft, Save, Share2, MoreHorizontal, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export function EditorHeader() {
  const [documentName, setDocumentName] = useState("无标题文档");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // 模拟保存操作
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };

  return (
    <header className="editor-header flex items-center justify-between border-b px-4 py-2 bg-white">
      <div className="flex items-center gap-3">
        <Link href="/documents">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Input
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="h-7 px-2 border-none text-lg font-medium focus-visible:ring-1 focus-visible:ring-offset-0 w-[200px]"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>自动保存</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={handleSave}
          variant="outline"
          size="sm"
          disabled={isSaving}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "保存中..." : "保存"}
        </Button>

        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          分享
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">更多选项</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>复制链接</DropdownMenuItem>
            <DropdownMenuItem>导出为PDF</DropdownMenuItem>
            <DropdownMenuItem>打印</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>删除文档</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
} 