"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu
}

  from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import FontSize from '@tiptap/extension-font-size';

import {
  useEffect
}

  from 'react';

import {
  EditorToolbar
}

  from './EditorToolbar';

import {
  cn
}

  from '@/lib/utils';
import './styles.css';

import {
  EditorHeader
}

  from './EditorHeader';

export interface TiptapEditorProps {
  content?: string;
  onUpdate?: (html: string) => void;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
}

const TiptapEditor = ({
  content = '',
  onUpdate,
  className,
  placeholder = '开始输入内容...',
  readOnly = false,
}

  : TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({
      history: {
        depth: 100,
        newGroupDelay: 500,
      }

      ,
    }

    ),
    Table.configure({
      resizable: true,
    }

    ),
      TableRow,
      TableCell,
      TableHeader,
      Image,
    Link.configure({
      openOnClick: false,
    }

    ),
      TaskList,
    TaskItem.configure({
      nested: true,
    }

    ),
    Placeholder.configure({
      placeholder,
    }

    ),
      TextStyle,
      Color,
    Highlight.configure({
      multicolor: true,
    }

    ),
      Underline,
      FontFamily,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }

    ),
      FontSize,
    ],
    content,
    editable: !readOnly,
    onUpdate: ({
      editor
    }

    ) => {
      const html = editor.getHTML();
      onUpdate?.(html);
    }

    ,
  }

  );

  // 确保编辑器在组件卸载时被销毁
  useEffect(() => {
    return () => {
      editor?.destroy();
    }

      ;
  }

    , [editor]);

  if (!editor) {
    return <div className="h-screen flex items-center justify-center">正在加载编辑器...</div>;
  }

  return (<div className={
    cn('tiptap-editor-container', className)
  }

  > <EditorHeader /> <EditorToolbar editor={
    editor
  }

    /> <BubbleMenu editor={
      editor
    }

      tippyOptions={
        {
          duration: 100
        }
      }

      className="bubble-menu bg-white shadow-md rounded-md flex overflow-hidden border divide-x"

    > <button onClick={
      () => editor.chain().focus().toggleBold().run()
    }

      className={
        cn("p-2 hover:bg-gray-100", {
          "bg-gray-100 text-primary": editor.isActive('bold')
        }

        )
      }

    > <span className="font-bold">B</span> </button> <button onClick={
      () => editor.chain().focus().toggleItalic().run()
    }

      className={
        cn("p-2 hover:bg-gray-100", {
          "bg-gray-100 text-primary": editor.isActive('italic')
        }

        )
      }

    > <span className="italic">I</span> </button> <button onClick={
      () => editor.chain().focus().toggleUnderline().run()
    }

      className={
        cn("p-2 hover:bg-gray-100", {
          "bg-gray-100 text-primary": editor.isActive('underline')
        }

        )
      }

    > <span className="underline">U</span> </button> <button onClick={
      () => editor.chain().focus().toggleStrike().run()
    }

      className={
        cn("p-2 hover:bg-gray-100", {
          "bg-gray-100 text-primary": editor.isActive('strike')
        }

        )
      }

    > <span className="line-through">S</span> </button> </BubbleMenu> <div className="editor-content-wrapper"> <div className="page-container"> <EditorContent editor={
      editor
    }

      className="editor-content" /> </div> </div> </div>);
}

export default TiptapEditor;