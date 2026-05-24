import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Trash2, Check } from 'lucide-react';

interface SignatureCanvasProps {
  key?: any;
  onSave: (base64Data: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export default function SignatureCanvas({ onSave, onClear, placeholder = 'Goreskan tanda tangan di sini' }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  // Initialize and scale canvas to fit container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Support device pixel ratio
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 160;

    // Set drawing styles
    ctx.strokeStyle = '#0f172a'; // Slate-900
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
    setIsEmpty(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    triggerSave();
  };

  const triggerSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const base64 = canvas.toDataURL('image/png');
    onSave(base64);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    if (onClear) onClear();
    onSave(''); // Pass empty signature
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative border-2 border-dashed border-slate-300 rounded-lg overflow-hidden bg-slate-50 hover:bg-slate-50/50 transition duration-150">
        
        {isEmpty && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-400 select-none px-4 text-center">
            <PenTool size={20} className="mb-1 text-slate-400" />
            <span className="text-xs font-mono">{placeholder}</span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="w-full h-40 block cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          id="drawing-canvas-signature"
        />

        {!isEmpty && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 pointer-events-auto">
            <span className="flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono font-medium">
              <Check size={10} /> Tercatat
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 opacity-90 hover:opacity-100 bg-red-100 text-red-700 hover:bg-red-200 transition duration-150 rounded-md"
              title="Hapus tanda tangan"
              id="btn-clear-sig"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
