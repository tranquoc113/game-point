import { listFilesOutput } from '@fleekhq/fleek-storage-js';
import Image from 'next/image';
import * as React from 'react';

export interface IImageListProps {
    lists: listFilesOutput[]
}

export function FleekImageList({lists}: IImageListProps) {
  return (
    <div>
      {
      lists.map((item) => (
        <Image key={item.key} src={item.publicUrl || ""} width={200} height={180} alt="xx"/>
      ))
    }
    </div>
  );
}
