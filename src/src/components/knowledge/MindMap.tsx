"use client";

import { useEffect, useRef } from "react";
import { Markmap } from "markmap-view";
import { Transformer } from "markmap-lib";

interface MindMapProps {
  markdown: string;
  className?: string;
}

export function MindMap({ markdown, className = "" }: MindMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const markmapRef = useRef<Markmap | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // 转换 Markdown 为 Markmap 数据
    const transformer = new Transformer();
    const { root } = transformer.transform(markdown);

    // 创建或更新 Markmap
    if (!markmapRef.current) {
      markmapRef.current = Markmap.create(svgRef.current, {
        paddingX: 12,
        spacingVertical: 8,
        spacingHorizontal: 80,
        autoFit: true,
        fitRatio: 0.95,
      });
    }

    // 渲染数据
    markmapRef.current.setData(root);
    markmapRef.current.fit();

    return () => {
      if (markmapRef.current) {
        markmapRef.current.destroy();
        markmapRef.current = null;
      }
    };
  }, [markdown]);

  return (
    <svg
      ref={svgRef}
      className={`h-full w-full ${className}`}
      style={{
        background: "transparent",
      }}
    />
  );
}
