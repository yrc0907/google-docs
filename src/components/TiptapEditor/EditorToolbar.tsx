"use client";

import { type Editor } from '@tiptap/react';
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Undo, Redo,
  Palette, Highlighter, Heading1, Heading2, Heading3, Text,
  Eraser, ChevronUp, ChevronDown
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const FONT_FAMILIES = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Impact', label: 'Impact' },
];

const COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
];

const HIGHLIGHT_COLORS = [
  '#FFFF00', '#00FF00', '#FF9900', '#FF0000', '#00FFFF', '#0000FF', '#9900FF', '#FF00FF',
  '#FFEFD5', '#FFE4E1', '#FFE4B5', '#FFDEAD', '#FFC0CB', '#FFB6C1', '#FFA07A', '#FF8C00',
];

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [fontSize, setFontSize] = useState('16px');
  const [fontSizeInput, setFontSizeInput] = useState('16');
  const [fontFamily, setFontFamily] = useState('Arial');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 从fontSize中提取数字部分
    const sizeNumber = fontSize.replace('px', '');
    setFontSizeInput(sizeNumber);
  }, [fontSize]);

  const handleFontSizeChange = (newSize: string) => {
    if (newSize.endsWith('px')) {
      setFontSize(newSize);
      editor?.chain().focus().setFontSize(newSize).run();
    } else {
      const sizeWithUnit = `${newSize}px`;
      setFontSize(sizeWithUnit);
      editor?.chain().focus().setFontSize(sizeWithUnit).run();
    }
  };

  const handleFontSizeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFontSizeInput(value);
  };

  const handleFontSizeInputBlur = () => {
    if (fontSizeInput) {
      const size = parseInt(fontSizeInput, 10);
      if (!isNaN(size) && size > 0) {
        handleFontSizeChange(`${size}px`);
      } else {
        // 如果输入无效，恢复到当前字体大小
        setFontSizeInput(fontSize.replace('px', ''));
      }
    }
  };

  const handleFontSizeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFontSizeInputBlur();
      inputRef.current?.blur();
    }
  };

  const increaseFontSize = () => {
    const currentSize = parseInt(fontSizeInput, 10);
    if (!isNaN(currentSize)) {
      const newSize = currentSize + 1;
      setFontSizeInput(newSize.toString());
      handleFontSizeChange(`${newSize}px`);
    }
  };

  const decreaseFontSize = () => {
    const currentSize = parseInt(fontSizeInput, 10);
    if (!isNaN(currentSize) && currentSize > 1) {
      const newSize = currentSize - 1;
      setFontSizeInput(newSize.toString());
      handleFontSizeChange(`${newSize}px`);
    }
  };

  if (!editor) {
    return null;
  }

  const setHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const toggleNormal = () => {
    editor.chain().focus().clearNodes().run();
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="editor-toolbar bg-white border-b p-1 flex flex-wrap gap-1 items-center sticky top-0 z-10">
        {/* 撤销 & 重做 */}
        <div className="toolbar-group flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>撤销</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>重做</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 标题切换 */}
        <div className="toolbar-group flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleNormal}
                className={cn({ 'bg-accent': editor.isActive('paragraph') })}
              >
                <Text className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>正文</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHeading(1)}
                className={cn({ 'bg-accent': editor.isActive('heading', { level: 1 }) })}
              >
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>标题1</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHeading(2)}
                className={cn({ 'bg-accent': editor.isActive('heading', { level: 2 }) })}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>标题2</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHeading(3)}
                className={cn({ 'bg-accent': editor.isActive('heading', { level: 3 }) })}
              >
                <Heading3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>标题3</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 字体与字号 */}
        <div className="toolbar-group flex items-center gap-1">
          <Select
            value={fontFamily}
            onValueChange={(value) => {
              setFontFamily(value);
              editor.chain().focus().setFontFamily(value).run();
            }}
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="选择字体" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {FONT_FAMILIES.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center h-8 border rounded-md">
            <Input
              ref={inputRef}
              type="text"
              value={fontSizeInput}
              onChange={handleFontSizeInputChange}
              onBlur={handleFontSizeInputBlur}
              onKeyDown={handleFontSizeInputKeyDown}
              className="h-full w-[40px] border-0 rounded-none text-center px-1"
            />
            <div className="flex flex-col border-l">
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 rounded-none border-b"
                onClick={increaseFontSize}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 rounded-none"
                onClick={decreaseFontSize}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 文字格式 */}
        <div className="toolbar-group flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn({ 'bg-accent': editor.isActive('bold') })}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>粗体</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn({ 'bg-accent': editor.isActive('italic') })}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>斜体</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={cn({ 'bg-accent': editor.isActive('underline') })}
              >
                <Underline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>下划线</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={cn({ 'bg-accent': editor.isActive('strike') })}
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>删除线</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.commands.unsetAllMarks()}
              >
                <Eraser className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>清除格式</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 颜色 */}
        <div className="toolbar-group flex items-center">
          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>文字颜色</TooltipContent>
            </Tooltip>
            <PopoverContent className="w-64 p-2">
              <div className="grid grid-cols-10 gap-1">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    className="w-5 h-5 rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ backgroundColor: color }}
                    onClick={() => editor.chain().focus().setColor(color).run()}
                    aria-label={`Set text color to ${color}`}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Highlighter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>高亮颜色</TooltipContent>
            </Tooltip>
            <PopoverContent className="w-64 p-2">
              <div className="grid grid-cols-8 gap-1">
                {HIGHLIGHT_COLORS.map((color) => (
                  <button
                    key={color}
                    className="w-5 h-5 rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ backgroundColor: color }}
                    onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                    aria-label={`Set highlight color to ${color}`}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 对齐方式 */}
        <div className="toolbar-group flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={cn({ 'bg-accent': editor.isActive({ textAlign: 'left' }) })}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>左对齐</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={cn({ 'bg-accent': editor.isActive({ textAlign: 'center' }) })}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>居中对齐</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={cn({ 'bg-accent': editor.isActive({ textAlign: 'right' }) })}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>右对齐</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={cn({ 'bg-accent': editor.isActive({ textAlign: 'justify' }) })}
              >
                <AlignJustify className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>两端对齐</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 列表 */}
        <div className="toolbar-group flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn({ 'bg-accent': editor.isActive('bulletList') })}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>无序列表</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn({ 'bg-accent': editor.isActive('orderedList') })}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>有序列表</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
} 