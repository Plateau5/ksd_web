<%@ taglib  prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<div id="header" class="header full_width">
	<div class="header_content normal_width">
		<a href="/home" class="logo">
			<%--<img class="block img_responsive" src="/static/img/logo/${domain}_logo.png" alt="快收单logo">--%>
			<img class="block img_responsive" src="/static/img/logo/logo.png" alt="快收单logo">
		</a>
		<ul class="header_nav inline_block">
			<li class="home nav_item <c:if test="${fn:startsWith(uri, '/home')||fn:startsWith(uri, '/login')}">active</c:if>">
				<a href="/home" class="">首页</a>
			</li>
			<per:button code="1091">
			<li class=" nav_item <c:if test="${fn:startsWith(uri, '/finance') || fn:startsWith(uri, '/compact') 
									  || fn:startsWith(uri, '/financial') || fn:startsWith(uri, '/operation') 
									  || fn:startsWith(uri, '/pigeonhole') || fn:startsWith(uri, '/requestPayout') 
									  || fn:startsWith(uri, '/otherfund')}">active</c:if>">
				<a href="http://localhost:3000/customer/system">客户</a>
			</li>
			</per:button>
			<per:button code="1366">
				<li class="nav_item <c:if test="${fn:startsWith(uri, '/supplier') || fn:startsWith(uri, '/records')}">active</c:if>">
					<a href="/supplier/system" class="">商户</a>
				</li>
			</per:button>
			<per:button code="1067">
			<li class=" nav_item <c:if test="${fn:startsWith(uri, '/organization') || fn:startsWith(uri, '/product')}">active</c:if>">
				<a href="/organization/getList">供应商</a>
			</li>
			</per:button>
			<per:button code="1312">
			<li class=" nav_item <c:if test="${fn:startsWith(uri, '/workflow') || fn:startsWith(uri, '/gps') || fn:startsWith(uri, '/administrative') || fn:startsWith(uri, '/citymanage') || fn:startsWith(uri, '/question') || fn:startsWith(uri, '/merquestion')}">active</c:if>">
				<a href="/warehouse/system">业务</a>
			</li>
			</per:button>
			<per:button code="1352">
				<li class=" nav_item <c:if test="${fn:startsWith(uri, '/statistics')}">active</c:if>">
					<a href="/statistics/system">统计</a>
				</li>
			</per:button>
			<li class=" nav_item <c:if test="${fn:startsWith(uri, '/employee') || fn:startsWith(uri, '/department')}">active</c:if>">
				<a href="/employee/getList">人员</a>
			</li>
			<per:button code="1270">
				<li class=" nav_item <c:if test="${fn:startsWith(uri, '/company') || fn:startsWith(uri, '/feedback')}">active</c:if>">
				<a href="/company/list">系统</a>
			</li>
			</per:button>
		</ul>
		<ul class="login rf inline_block" id="id_center" style="display: none;">

			<li class="characters">
				<%--<a href="/personal/center">--%>
				<a href="javascript:">
					<img id="header_image_url" src="" class="character_photo" />
					<span id="header_username" class="header_username"></span>
				</a>
				<ul class="user_setting">
					<li class="setting_item"><a href="/personal/file">账号设置</a></li>
					<per:button code="1251">
						<li class="setting_item"><a href="/privilege/system">权限管理</a></li>
					</per:button>
					<li class="setting_item"><a href="/login/logout">退出登录</a></li>
				</ul>
			</li>

			<li class="message" id="header_messages">
				<a href="/message/getAllList">
					<span class="message_icon inline_block">
						<span class="message_count"><span style="display:inline-block;transform:scale(0.8);"></span></span>
					</span>
				</a>
				<%--<div class="message_tip">您有&nbsp;<span class="count blod"></span>&nbsp;条待处理事项</div>--%>
			</li>
		</ul>
	</div>
</div>
<script type="text/javascript">
	var LOCALURL = '${local_url}';
	var DOMAIN = '${domain}';
</script>

