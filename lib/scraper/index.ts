import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "@/lib/utils";


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
    
      const price = extractPrice(
        $("a-price.a-text-price.a-size-medium.apexPriceToPay")
        // $(".priceToPay span.a-price-whole"),
        // $(".a-size.base.a-color-price")
      );
          console.log(title, price);
    } catch (error :  any) {
     console.error(`Failed to scrape product ${error.message}`)      
    }


  }
