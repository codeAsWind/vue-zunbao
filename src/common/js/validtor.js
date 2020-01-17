export default {
  usernameReg:/^\w{6,11}$/,
  phoneReg:/^1\d{10}$/,
  // passwordReg:/^[a-zA-Z]\w{5,15}$/,
  passwordReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,//密码
  codeReg:/^\d{4}$/,
  chineseReg:/^[\u4e00-\u9fa5,\·]+$/,//中文姓名
  agentAccountReg:/^a_[\da-zA-Z]{3,15}$/,//代理帐号
  qqReg:/\d{4,13}/,//qq
  emailReg:/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,//邮箱
  bankReg:/^(\d{16,19})$/, //银行卡号
  intNumReg:/^[0-9]*$/ //正整数
}