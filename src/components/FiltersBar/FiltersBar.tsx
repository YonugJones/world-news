/*
Controlled inputs
	•	Category buttons or select
	•	Region select
	•	Search input
*/

import type { NewsCategory, NewsRegion } from '../../types/news'

type FiltersBarProps = {
  category: NewsCategory
  region: NewsRegion
  search: string
  onCategoryChange: (category: NewsCategory) => void
  onRegionChange: (region: NewsRegion) => void
  onSearchChange: (value: string) => void
}

export function FiltersBar({
  category,
  region,
  search,
  onCategoryChange,
  onRegionChange,
  onSearchChange,
}: FiltersBarProps) {
  return (
    <section aria-label='Filters'>
      <div>
        <label htmlFor='category'>Category</label>
        <select
          id='category'
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as NewsCategory)}
        >
          <option value='top'>Top</option>
          <option value='world'>World</option>
          <option value='business'>Business</option>
          <option value='technology'>Technology</option>
          <option value='sports'>Sports</option>
          <option value='science'>Science</option>
          <option value='health'>Health</option>
          <option value='entertainment'>Entertainment</option>
        </select>
      </div>

      <div>
        <label htmlFor='region'>Region</label>
        <select
          id='region'
          value={region}
          onChange={(e) => onRegionChange(e.target.value as NewsRegion)}
        >
          <option value='world'>World</option>
          <option value='us'>US</option>
          <option value='eu'>EU</option>
          <option value='asia'>Asia</option>
          <option value='africa'>Africa</option>
          <option value='americas'>Americas</option>
        </select>
      </div>

      <div>
        <label htmlFor='search'>Search</label>
        <input
          id='search'
          type='search'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='Search headlines...'
        />
      </div>
    </section>
  )
}
