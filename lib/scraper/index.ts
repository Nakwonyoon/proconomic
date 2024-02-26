import axios from "axios";
import * as cheerio from "cheerio";
import { extraCurrency, extractPrice } from "@/lib/utils";


export async function scrapeAmazonProduct ( url : string) {
   if(!url) return

    // bright data proxy configuration  
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
      auth :{
        username: `${username}-session-${session_id}`,
        password,
      },
      host : 'brd.superproxy.io',
      port,
      rejectUnauthorized: false,
    }

    try {
      const response = await axios.get (url , options);
      const $ = cheerio.load(response.data);

      const title = $("#productTitle").text().trim();
    
      const currentPrice = extractPrice(
        $("span.a-price.aok-align-center"),
        $("span.a-offscreen"),
        $(".a-price.a-text-price span.a-offscreen"),
        $("prod-sale-price price-align")
      )

       const originalPrice = extractPrice(
         $("#priceblock_ourprice"),
         $(".a-price.a-text-price span.a-offscreen"),
         $("#listPrice"),
         $(".origin-price"),
         $("#priceblock_dealprice"),
         $(".a-size-base.a-color-price")
       );

       const outOfStock = $("#availability").text().trim().toLowerCase() === "currently unavailable";

       const images = $("#imgBlkFront").attr("data-a-dynamic-image") ||
                     $("#landingImage").attr("data-a-dynamic-image");

       const imageURL = Object.keys(JSON.parse(images))[0];
       
       const currency = extraCurrency(
        $(".a-price-symbol"),
       );
       console.log({
         title,
         currentPrice,
         originalPrice,
         outOfStock,
         imageURL,
         currency
       });
        
    } catch (error :  any) {
     console.error(`Failed to scrape product ${error.message}`)      
    }


  }
