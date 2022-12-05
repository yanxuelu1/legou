/**
 *购物车JS文件 
 */
$(function(){
    //1.全选
    // 1.点击表头的全选框 获取表头全选框的选中状态
    // 2.表格中的单选框状态需要一致
    // 3.结算中的全选状态一致

//定义三个变量
var $theadInput = $('table thead input[type=checkbox]');//头部选择框
var $bodyInput = $('table tbody input[type=checkbox]');//中间选择框
var $allPriceInput = $('.totalPrice input[type=checkbox]');//结算选择框

	$theadInput.change(function(){
        // 获取选中的状态
		var state=$(this).prop('checked');

		$bodyInput.prop('checked',state);
		$allPriceInput.prop('checked',state);

		// 调用计算机总价函数
		calcTotalPrice();
	})
	//结算中的选择框，也需要有相同的选择功能
	$allPriceInput.change(function(){
		var state=$(this).prop('checked');
		$bodyInput.prop('checked',state);
		$theadInput.prop('checked',state);

		// 调用计算机总价函数
		calcTotalPrice();
	})
	//表单中的选中状态，反过来影响全选
	$bodyInput.change(function(){
		//第一个标杆
		var flag = true;
		//总价
		// var totalPrice=0;
		$bodyInput.each(function(i,input){
			//循环表格中所有选择框的选中状态
			if (!$(input).prop('checked')){
				flag = false;//只要有一个选择框没有选中 那么状态就变为false
			}
			// else{
			// 	totalPrice+=parseFloat($(this).closest('tr').find('.subprice').text());	
			// }
		})
		//把状态用来改变全选框
		$theadInput.prop('checked',flag)
		$allPriceInput.prop('checked',flag)

		// 调用计算机总价函数
		calcTotalPrice();

		//渲染到总价对应的位置
		// $('.total').text(totalPrice.toFixed(2))
	})
	//数量的加减
	//加
	$('.add').on('click',function(){
		//下一个input节点
		var $nextInput=$(this).next();
		//获取输入框的值
		var oldVal=parseInt($(this).next().val());
		//自增
		oldVal++;
		//重新赋值给这个输入框
		$nextInput.val(oldVal);

		//小计
		subTotalPrice(oldVal,$(this));
	
		// 调用计算机总价函数
		calcTotalPrice();
		
	})
	//减
	$('.reduce').on('click',function(){
		//上一个input节点
		var $prevInput=$(this).prev();
		//获取输入框的值
		var oldVal=parseInt($prevInput.val());
		//自增
		oldVal--;
		if(oldVal<1){
			oldVal=oldVal<1?1:oldVal;//如果小于1 那么就等于1 否则就等于自己
		}
		//重新赋值给这个输入框
		$prevInput.val(oldVal);
		//小计
		subTotalPrice(oldVal,$(this));

		// 调用计算机总价函数
		calcTotalPrice();

	})
	//抽取一个小计的函数
	function subTotalPrice(val,dom){
		var subtotal= val* parseFloat(dom.closest('tr').find('.price').text());
		//把小计的结果 放入dom对应的位置
		dom.closest('tr').find('.subprice').text(subtotal.toFixed(2));
	}
	//删除
	$('.del').click(function(){
		//删除整行
		$(this).closest('tr').remove();
		calcGoodsCount();//调用商品总数量
	})
	//计算总价
	$bodyInput.each(function(i,input){
		var totalPrice=0;
		//判断选中状态 被选中的需要计算总价
		if($(input).prop('checked')===true){
		totalPrice+=parseFloat($(this).closest('tr').find('.subprice').text());	
		}
	})
	//计算总价的函数
	function calcTotalPrice(){
		// 定义一个数量
		var count=0;
		// 定义变量 保持总价格
		var totalPrice=0;

		//循环表格中的所有选择框 如果是被选中的状态 就计算总价
		$('table tbody input[type=checkbox]').each(function(i,input){
			if($(input).prop('checked')){
				// 自增
				count++;
				// 累加价格
				totalPrice+=parseFloat($(input).closest('tr').find('.subprice').text())
			}
		})

		// 把总价渲染到对应的位置
		$('.total').text(totalPrice.toFixed(2))
		// 把数量渲染到对应的位置
		$('.count').text(count)
	}
	
	// 全部商品
	function calcGoodsCount(){
		$('.goodsCount').text($('table tbody tr').length)
	}
	calcTotalPrice();//一进入界面 就调用一次

	// 删除选中商品
	$('.deleteChecked').on('click',function(){
		// 循环单选框 如果选中 则删除这一行
		$bodyInput.each(function(i,input){
			if($(this).prop('checked')){
				$(this).closest('tr').remove();
			}
		})
		// 计算总价
		calcTotalPrice();
		// 计算商品数量
		calcGoodsCount();
	})

})