module.exports = {
  '/epoch/api/apis/list': [
    {
      id: 1,
      master: 'root',
      permission: 1,
      name: '老黄历',
      method: 0,
      url: 'http://81.70.80.152/epoch/api/third/date',
      description: '获取老黄历的各种描述信息',
      type: 'application/json;charset=utf8',
      param: 'none'
    },
    {
      id: 2,
      master: 'root',
      permission: 0,
      name: '舔狗日记',
      method: 0,
      url: 'http://81.70.80.152/epoch/api/third/flatterer',
      description: '获取一条舔狗日记',
      type: 'application/json;charset=utf8',
      param: 'none'
    },
    {
      id: 3,
      master: 'root',
      permission: 1,
      name: '彩虹屁',
      method: 0,
      url: 'http://81.70.80.152/epoch/api/third/rainbow',
      description: '获取一条彩虹屁',
      type: 'application/json;charset=utf8',
      param: 'none'
    },
    {
      id: 4,
      master: 'root',
      permission: 1,
      name: '精美文句',
      method: 0,
      url: 'http://81.70.80.152/epoch/api/third/gold',
      description: '获取一条各种书刊杂志的优美句子',
      type: 'application/json;charset=utf8',
      param: 'none'
    },
    {
      id: 5,
      master: 'root',
      permission: 1,
      name: '公网ip',
      method: 0,
      url: 'http://81.70.80.152/epoch/api/third/ip/number',
      description: '获取客户端的公网ip地址',
      type: 'application/json;charset=utf8',
      param: 'none'
    },
    {
      id: 6,
      master: 'root',
      permission: 1,
      name: '地理信息',
      method: 0,
      url: 'http://81.70.80.152/epoch/api/third/ip/detail',
      description: '获取指定ip的地理信息',
      type: 'application/json;charset=utf8',
      param: 'ip=(传入ip值)'
    },
    {
      id: 7,
      master: 'root',
      permission: 1,
      name: '天气预报',
      method: 0,
      url: 'http://81.70.80.152/epoch/api/third/weather',
      description: '获取指定ip的天气信息',
      type: 'application/json;charset=utf8',
      param: 'ip=(传入ip值)'
    }
  ]
}
