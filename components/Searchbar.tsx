'use client'

import { scrapeAndStoreProduct } from '@/lib/actions';
import { useState , FormEvent } from 'react'

const isValidAmazonProductUrl = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostName = parsedURL.hostname
      // check if it is amazon 
      if(hostName.includes('amazon.com') || hostName.includes('amazon') || hostName.endsWith('amazon') ) {
        return true;
      } 
      
    } catch (error) {
      return

    }
    return false;
}


const Searchbar = () => {
   const [searchPrompt, setSearchPrompt] = useState('')
   const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductUrl(searchPrompt);
    if (!isValidLink) return alert("Invalid Amazon Product URL")
      
    try {
      setIsLoading(true);

        const product = await scrapeAndStoreProduct(searchPrompt);
        console.log(product);      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <form className="flex flex-wrap gap-4 mt-12"
    onSubmit={handleSubmit}
    >
    <input
    type="text"
    placeholder="Search for products"
    value={searchPrompt}
    className="searchbar-input"
    onChange={ e => setSearchPrompt(e.target.value)}
    />
    <button 
    type="submit" 
    className="searchbar-btn"
    disabled={searchPrompt === ""}
    >
      
      {isLoading ? "Searching..." : "Search"}

    </button>
    </form>
  )
}

export default Searchbar