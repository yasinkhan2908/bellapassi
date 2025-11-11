'use client';

import { FilterSidebarProps } from '../../types';

const FilterSidebar = ({ show }: FilterSidebarProps) => {
  

  if (!show) return null;

  // ... rest of sidebar code ...
  
  return (
    <div className="offcanvas offcanvas-start show leftsidebar" tabIndex={-1}>
      
    </div>
  );
};

export default FilterSidebar;