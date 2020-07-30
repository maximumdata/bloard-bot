const puppeteer = require('puppeteer');

export default async function bloardPost(message, args) {
  //init headless browser
  const browser = await puppeteer.launch({defaultViewport: {width: 1000, height: 200}});
  if (!browser.isConnected()) {
    //fires if browser couldnt initialize for some reason
    return message.channel.send('couldnt load')
  }
  const page = await browser.newPage();

  //figure out where to nav
  if (args.length) {
    //if command was entered with arguments, nav to that users page
    await page.goto(`https://bloard.com/users/${args.join('-')}`)

    // validate user page exists
    try {
      await page.evaluate(() => {return $('.navbar')})
    } catch (error) {
      await browser.close();
      return message.channel.send('that user dead')
    }
  } else {
    //if command was entered without args, nav to top posts
    await page.goto('https://bloard.com/posts/top/all')
  }

  let url = page.url()

  // determine how many pages of posts there are
  const lastPage = await page.evaluate(() => {
    let pages = $('.pagination');
    // if there is not pagination element, return 1
    if (!pages.length) {
      return 1
    } else {
      return parseInt(
        $('.pagination')[0]
          .children.item($('.pagination')[0].children.length-1)
          .children[0].attributes.href.nodeValue.replace(/(\/.*=)/, '')
      )
    }
  })

  let randomPage = Math.floor(Math.random() * parseInt(lastPage))

  // nav to random page
  await page.goto(`${url}?page=${randomPage}`);


  let randomPost = await page.evaluate(() => {
    let randomPost = Math.floor(Math.random() * $('.bloard-post').length);
    return $('.bloard-post')[randomPost].id.replace(/(post-)/, '')
  })

  //nav to random post
  await page.goto(`https://bloard.com/bloards/egg/topics/leg/posts/${randomPost}`)
  //increase font size for grandpa
  await page.addStyleTag({content: '.bloard-post-content{font-size: 25px}'})
  //take screenshot
  const img = await page.screenshot({fullPage: true});
  //we out
  await browser.close();
  return message.channel.send('', { files: [img] });
}
