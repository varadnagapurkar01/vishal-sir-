import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'video';
  isPriority: boolean;
  priorityOrder?: number;
  title: string;
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'process.cwd()' in process ? process.cwd() : '', 'public');
    const videosDir = path.join(publicDir, 'videos');

    const mediaList: MediaItem[] = [];

    // Scan Root public for priority videos
    if (fs.existsSync(publicDir)) {
      const rootFiles = fs.readdirSync(publicDir);
      rootFiles.forEach((file) => {
        const lower = file.toLowerCase();
        if (
          (lower === 'priority-1.mp4' || lower === 'priority-2.mp4' || lower === 'priority1.mp4' || lower === 'priority2.mp4')
        ) {
          const isPriority1 = lower.includes('1');
          mediaList.push({
            id: `video-${file}`,
            name: file,
            url: `/${file}`,
            type: 'video',
            isPriority: true,
            priorityOrder: isPriority1 ? 1 : 2,
            title: file,
          });
        }
      });
    }

    // Scan public/videos — EXCLUDE intro videos like last goal.mp4 / lastgoal.mp4
    if (fs.existsSync(videosDir)) {
      const videoFiles = fs.readdirSync(videosDir);
      videoFiles.forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        const lower = file.toLowerCase();
        if (
          ['.mp4', '.webm', '.ogg', '.mov', '.m4v'].includes(ext) &&
          !lower.includes('last goal') &&
          !lower.includes('lastgoal')
        ) {
          const isPriority = lower.includes('priority');
          mediaList.push({
            id: `video-${file}`,
            name: file,
            url: `/videos/${file}`,
            type: 'video',
            isPriority,
            title: file,
          });
        }
      });
    }

    // Sort: priority files first, then alphabetically by filename
    mediaList.sort((a, b) => {
      if (a.isPriority && !b.isPriority) return -1;
      if (!a.isPriority && b.isPriority) return 1;
      if (a.isPriority && b.isPriority) {
        return (a.priorityOrder || 99) - (b.priorityOrder || 99);
      }
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({ success: true, count: mediaList.length, media: mediaList });
  } catch (error) {
    return NextResponse.json({ success: false, media: [] });
  }
}
