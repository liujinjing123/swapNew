# swapNew
     上周的主要是在做链下的匹配工作，这里引入了链下用户，链下用户信息与包括以太坊账户地址，
     头寸类型，掉期时间和掉期数量等关联到一起，如下图：
 ![image](https://github.com/liujinjing123/swapNew/blob/master/imagess/1.png);

    这周的主要工作是实现链下和链上数据的连接，我先说一下我想要做的样子，首先在链下把两个
    交易对手的信息传输到链上，然后再链上生成包括swap子合约地址在内的一系列信息，返回到链下，
    再把这些信息用链下用户信息结合到一起，生成如下的数据保存进数据库：
 ![image](https://github.com/liujinjing123/swapNew/blob/master/imagess/2.png);
 
     然后就是链上swap内数据会随着时间，以及利率的变化对产生变化，需要把产生变化
     的数据进行更新，并在数据库中也进行更新，这样就可以把链上链下的数据同步。
    
    遇到的问题描述：
    在链上链下的数据传输中出现了问题，链下的是java语言的项目，链上是solidity语言的项目，我们都
    是在web端进行操作的，java用的是tomcat启动服务，     truffle框架下的solidity使用的lite-server
     启动服务，我找几种方法都传不过去，后来就用了一种很不安全的方法传数据，就像下图：
   ![image](https://github.com/liujinjing123/swapNew/blob/master/imagess/3.png);
   
     url传值数据会显示在网址上，还有就是把数据上链生成swap合约之后，根据事件获取的信息要传到java
     项目中并保存到数据库中，这回出现上述的问题。
     
       下面是现在做成的系统流程图：
       ①第一个界面就是用户登录界面，用户要与头寸绑定在一起
   ![image](https://github.com/liujinjing123/swapNew/blob/master/imagess/4.png);
   
       ②登录进来就会显示当前用户提交过的头寸申请列表，查询按钮可以根据头寸类型，
       掉期数量和掉期时间在库里面检索交易对手列表。
   ![image](https://github.com/liujinjing123/swapNew/blob/master/imagess/5.png);
   
      ③点击添加按钮可以添加头寸申请。
   ![image](https://github.com/liujinjing123/swapNew/blob/master/imagess/6.png);
   
     ④点击操作栏内的匹配，然后输入自己的头寸id，经过对头寸类型，数量和时间的判断，
      把这一系列信息传导solidity语言的链上端。
   ![image](https://github.com/liujinjing123/swapNew/blob/master/imagess/7.png);
   ![image](https://github.com/liujinjing123/swapNew/blob/master/imagess/8.png);
   
    ⑤获取java端传来的数据并上链生成swap合约，然后根据事件获取日志文件，在web端显示出来。
   ![image](https://github.com/liujinjing123/swapNew/blob/master/imagess/9.png);
   
   
      
      

