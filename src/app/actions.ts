'use server';

import { ICharacter } from '@/types/api-types';

export async function createCSV(items: ICharacter[]) {
  const tableHeader = [
    'id',
    'name',
    'status',
    'species',
    'type',
    'gender',
    'origin',
    'location',
  ];
  const tableRows = items.map((item) => [
    item.id,
    item.name,
    item.status,
    item.species,
    item.type,
    item.gender,
    item.origin.name,
    item.location.name,
  ]);
  const csvContent = `${tableHeader.join(',')}\n${tableRows.map((row) => row.join(',')).join('\n')}`;

  return csvContent;
}
