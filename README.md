# Old MMUCraft official website

We are translate the existing PHP website to Node.js based website and upgrading the website services therefore this repository/code is not maintained anymore.
[This](https://github.com/keishidesu/mmucraft-website) is the repository for the new website.

# Setup

Run this
```sh
npm install
```

Copy `.env.example` rename to `.env` and fill in the variables.

# Start

The website will host locally on port 3000. Use following command to start the server:

```sh
npm start
```

This will start `nodemon`. It will automatically restart the server every time the file changes. 

The website will be available at `localhost:3000`. Enter the URL to your browser.

# Notices

## Coding styles

- Use 2 spaces as indentation
- Use camel case for JS language
- Use kebab case for CSS classes
- Name everything logically
- Use `()=>{}` syntax for anonymous functions

## Database

Make sure to have MySQL database available in your PC.

Run this to have all the table set up in your database
```sh
npm run import
```

Suggested database name: `mmucraft`

### MySQL 8.0+

MySQL 8.0+ uses a new default authentication method (caching_sha2_password), which replaces the old authentication method used in MySQL 5.7~ (mysql_native_password, identified as Legacy Authentication in MySQL 8.0+). At the moment, the community Node.js drivers for MySQL does NOT support the client-side authentication mechanisms for the new authentication method. This can cause issues for users who are trying to run this project using the latest MySQL server versions ([see this image for an example error](https://i.imgur.com/hfIUF82.png)).

Read [this](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server) for a solution (Does not work with MySQL servers hosted on distros under WSL).

### Windows Subsystem for Linux (WSL) [Ubuntu and Debian]

If you are using WSL, do not download the latest repos from MySQL/MariaDB's official websites! They cause two problems:
1. Highlighted in the MySQL 8.0+ subheader, with an additional caveat: the solution provided there will **not** work here.
2. For MySQL, the latest packages provided by Oracle are not designed to be installed under WSL-based distros. For example, the latest MySQL service file is now located at ```/lib/systemd/system/mysql.service``` since ```/etc/init.d (service)``` is considered as legacy in the latest Ubuntu/Debian versions. Though, the official distros that get shipped for WSL still make use of ```/etc/init.d``` to manage the service files. This causes a conflict where you can't control the MySQL server's status via the service command (since the file is not in ```/etc/init.d``` but in ```/lib/systemd/system/mysql.service```). 

To avoid all these problems, completely remove your MySQL client/server (search online for working steps) and remove all repository sources that link towards MySQL (Oracle)'s official repos. Then, run:

```sh
sudo apt update
sudo apt install mysql-server # Get MySQL 5.7 from Ubuntu (Canonical)'s repos instead
```


### Adding New Table

If you added new table, run this to generate the model.
```sh
npm run model -- -o "./models/definitions" -d yourdatabase -h yourhost -u yourusername -p yourport -x yourpassword -e mysql -t yourtable
```

Open the `./models/definitions/index.js` add the path to the object.

## CSS

Use as much `Bootstrap` as possible. Minimize your the custom made CSS. Bootstrap class already covered most of the things you wanted to do. The only valid reason that for you to code custom CSS is you cannot find any class to achieve what you want in `Bootstrap` or super-high complexity in your design.

[Documentation](https://getbootstrap.com/docs/4.3/getting-started/introduction/) for Bootstrap 4. Make sure to read it if you are unfamiliar with Bootstrap.

### Custom Class

If you really need to define a custom class. Make sure the class is re-usable and not just for special cases. If you keep on making classes just for all your special components in the design, the CSS stylesheets will become not maintainable.
