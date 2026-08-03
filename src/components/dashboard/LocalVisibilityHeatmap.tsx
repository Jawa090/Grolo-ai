'use client';

import React from 'react';
import { MapPin, Navigation, Compass, Info } from 'lucide-react';
import { mockLocalVisibilityAreas } from '../../data/mockData';

export const LocalVisibilityHeatmap: React.FC = () => {
  // 5x5 Grid representation for the geo heat map
  const gridCells = [
    { pos: '1', rank: 3, label: 'NW', bg: 'bg-emerald-500 text-white' },
    { pos: '2', rank: 2, label: 'N', bg: 'bg-emerald-500 text-white' },
    { pos: '3', rank: 1, label: 'N', bg: 'bg-emerald-600 text-white font-bold' },
    { pos: '4', rank: 2, label: 'NE', bg: 'bg-emerald-500 text-white' },
    { pos: '5', rank: 4, label: 'NE', bg: 'bg-[#F59E0B] text-white' },

    { pos: '6', rank: 2, label: 'W', bg: 'bg-emerald-500 text-white' },
    { pos: '7', rank: 1, label: 'W', bg: 'bg-emerald-600 text-white font-bold' },
    { pos: '8', rank: 1, label: 'DT', bg: 'bg-blue-600 text-white font-extrabold ring-2 ring-blue-300' },
    { pos: '9', rank: 1, label: 'E', bg: 'bg-emerald-600 text-white font-bold' },
    { pos: '10', rank: 3, label: 'E', bg: 'bg-emerald-500 text-white' },

    { pos: '11', rank: 6, label: 'W', bg: 'bg-[#DC2626] text-white' },
    { pos: '12', rank: 2, label: 'W', bg: 'bg-emerald-500 text-white' },
    { pos: '13', rank: 1, label: 'DT', bg: 'bg-emerald-600 text-white font-bold' },
    { pos: '14', rank: 4, label: 'E', bg: 'bg-[#F59E0B] text-white' },
    { pos: '15', rank: 5, label: 'SE', bg: 'bg-[#F59E0B] text-white' },

    { pos: '16', rank: 5, label: 'SW', bg: 'bg-[#F59E0B] text-white' },
    { pos: '17', rank: 3, label: 'S', bg: 'bg-emerald-500 text-white' },
    { pos: '18', rank: 2, label: 'S', bg: 'bg-emerald-500 text-white' },
    { pos: '19', rank: 4, label: 'SE', bg: 'bg-[#F59E0B] text-white' },
    { pos: '20', rank: 7, label: 'SE', bg: 'bg-[#DC2626] text-white' },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden font-sans">
      {/* Header */}
      <div className="p-5 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#111827] tracking-tight">Local Geo Visibility</h3>
            <p className="text-xs text-[#6B7280]">
              Google Maps rank positions calculated across 5x5 mile grid radius in Seattle.
            </p>
          </div>
          <span className="text-[11px] font-semibold bg-gray-100 text-[#111827] px-2.5 py-1 rounded-md">
            Radius: 5 Miles
          </span>
        </div>
      </div>

      {/* Grid & Areas Breakdown */}
      <div className="p-5 flex flex-col gap-5">
        {/* Heat Map Visual Grid */}
        <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280] mb-2 px-1">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Geo Grid Density
            </span>
            <span className="text-[11px] text-[#2563EB]">Center: 1420 5th Ave (HQ)</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 w-full max-w-sm mx-auto my-2">
            {gridCells.map((cell) => (
              <div
                key={cell.pos}
                className={`h-9 rounded-lg ${cell.bg} flex items-center justify-center text-xs shadow-2xs transition-transform hover:scale-105 cursor-pointer`}
                title={`Grid ${cell.label}: Rank #${cell.rank}`}
              >
                <span>#{cell.rank}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-[#6B7280] pt-3 border-t border-gray-200 mt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
              <span>Rank 1-3 (High)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#F59E0B] inline-block" />
              <span>Rank 4-5 (Medium)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#DC2626] inline-block" />
              <span>Rank 6+ (Needs Boost)</span>
            </div>
          </div>
        </div>

        {/* Top Performing Areas List */}
        <div>
          <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
            Top Performing Areas
          </h4>

          <div className="divide-y divide-[#E5E7EB] border border-[#E5E7EB] rounded-xl overflow-hidden text-xs">
            {mockLocalVisibilityAreas.map((area) => (
              <div key={area.id} className="p-3 bg-white hover:bg-gray-50 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#2563EB]" />
                  <div>
                    <span className="font-bold text-[#111827]">{area.name}</span>
                    <p className="text-[11px] text-[#6B7280]">{area.gridCoordinate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#111827]">Rank #{area.rank}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      area.status === 'High Visibility'
                        ? 'bg-emerald-50 text-[#16A34A]'
                        : area.status === 'Good Visibility'
                        ? 'bg-blue-50 text-[#2563EB]'
                        : area.status === 'Needs Boost'
                        ? 'bg-amber-50 text-[#F59E0B]'
                        : 'bg-red-50 text-[#DC2626]'
                    }`}
                  >
                    {area.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

