# serchscript

Read about this project at the project itself here: https://www.serchscript.com/articles/about-this-app

or if you prefer to stay here, I'll copy paste the content:

## Hello there! Welcome!
The website you are visiting is a blog and it's been developed using pretty common technologies:

+ **React.js**: Popular frontend javascript framework.
+ **React-Redux.js**: Library to manage application state
+ **Typescript**: Superset of javascript that adds static typing to the language
+ **Webpack**: Javascript bundler
+ **Node.js**: Express.js, actually, as backend javascript framework
+ **MongoDB**: NoSQL database
+ **Draft.js**: WYSIWYG package, used to create and update the articles of the blog (including this one)
+ **Docker**: To create an environment for development
+ **Git**: For version control
+ **React-Router**, **Jest, Babel**, **SASS**, and more...

But what is actually interesting about this project is that it serves both **SSR (Server Side Rendered)** and **CSR (Client Side Rendered)** content. So to say, it acts both as a SSR app, in the way other frameworks would, as Next.js or Gatsby.js, and also as **SPA** (Single Page Application) in the way Create-React-App does, for example.

Two in one go.

## Why would you want to do that?
Both SSR and SPA apps have their pros and cons, which we'll summarize in the following lines:

### SSR - pros
HTML, javascript code and actual data is sent from the server in one go. That allows Google crawler to inspect the data and figure out what that particular page is all about, so it can be correctly indexed. If you care about SEO, SSR is the way to go.

### SPA - pros
Because HTML and javascript code (not data) is sent from a different server, it can load the whole application all at once. Data is then requested on demand to the backend. This allows a much better experience for the user, enjoying a smoother navigation throughout the app, not having to wait for the backend to render the page every time.

### SSR - cons
Not optimal user experience, as explain before.

### SPA - cons
Not SEO friendly. Also shows those awkward "loading" spinners when the user visits the site.

## How it works
They say that a sequence diagram is worth a thousand words:

![serchscript app diagram](https://user-images.githubusercontent.com/7117662/222445160-c539d1c5-8d24-4f6c-9b86-7bf91a21e176.png)

How do we know it works?
Let's check it ourselves opening the network tab of the browser

![network tab first render](https://user-images.githubusercontent.com/7117662/222445405-510f2591-54aa-4816-8523-25090c1911e1.JPG)

You can see that when visiting one of the blog's articles the server sends a rendered html.

![netword tab second render](https://user-images.githubusercontent.com/7117662/222445481-7ad81ba8-c87f-43e8-aa8d-1030ffff4cb0.JPG)

article image
And later, when navigating to a different article, the frontend will only request data (json, in our case):


article image
I use this blog for my personal notes. I know, didn't need to do all this to have my own blog, but I enjoyed it :)


The code is available in **GitHub** to be used in any way:

https://github.com/CasioPT87/serchscript


You can search for **posts of this blog** here:

https://www.serchscript.com


And if you want to **contact me**, this is my **Linkedin** profile:

https://www.linkedin.com/in/sergio-ibanez-moreno-76ab2095/


Thanks for reading!!


