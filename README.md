# swapNew
    上周的主要是在做链下的匹配工作，这里引入了链下用户，链下用户信息与包括以太坊账户地址，
     头寸类型，掉期时间和掉期数量等关联到一起，如下图：
![image](https://github.com/liujinjing123/swapNew/blob/master/images/1.png)

    这周的主要工作是实现链下和链上数据的连接，我先说一下我想要做的样子，首先在链下把两个
交易对手的信息传输到链上，然后再链上生成包括swap子合约地址在内的一系列信息，返回到链下，
再把这些信息用链下用户信息结合到一起，生成如下的数据保存进数据库：
![image](https://github.com/liujinjing123/swapNew/blob/master/images/图片2.png)
