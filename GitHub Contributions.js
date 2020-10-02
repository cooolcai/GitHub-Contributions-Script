// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: code-branch;
// share-sheet-inputs: plain-text;
// 获取数据
const regex = /<rect class="day" width="[0-9]{2}" height="[0-9]{2}" x="[0-9\-]{0,3}" y="[0-9\-]{0,3}" fill="(#[a-z0-9]{6})" data-count="(\d{0,3})" data-date="(\d{4}-\d{2}-\d{2})"\/>/g;
let url = "https://github.com/users/"+args.widgetParameter+"/contributions";
let req = new Request(url);
// 设置时区
req.headers = {"Cookie":"tz=Asia/Shanghai"}
let resp = await req.loadString()  
let array = [...resp.matchAll(regex)].slice(-91)
// 设置小组件头部
let w = new ListWidget()
const header = w.addText("Github contributions")
  header.leftAlignText()
  header.textColor = Color.white()
  header.font = Font.heavySystemFont(18)
// 设置主要内容
const rect = "■ "
// 初始化每一行
let l1 = w.addStack()
let l2 = w.addStack()
let l3 = w.addStack()
let l4 = w.addStack()
let l5 = w.addStack()
let l6 = w.addStack()
let l7 = w.addStack()
let ls = [l1,l2,l3,l4,l5,l6,l7]

for (let [i,l] of ls.entries()){
  // 设置水平放置
  l.layoutHorizontally()
  // 获取日期对应的星期
  let date = new Date(array[i][3])
  let formatter = new DateFormatter()
  formatter.dateFormat = "E"
  let forDate = formatter.string(date)
  let t = l.addText("     " + forDate + "     ")
  t.font = Font.regularSystemFont(12)
}

// 填充每一个小绿块
for (let [i,day] of array.entries()){
  let color = day[1]
  let t = ls[i%7].addText(rect)
  t.textColor = new Color(color,1)
  t.font = Font.regularSystemFont(12)
}

// 设置小组件尾部
let formatter = new DateFormatter()
  formatter.dateFormat = "更新于 yyyy-MM-dd HH:mm"
  let forDate = formatter.string(new Date())
const footer = w.addText(forDate)
  footer.rightAlignText()
  footer.textColor = Color.white()
  footer.font = Font.mediumSystemFont(8)

w.presentMedium()