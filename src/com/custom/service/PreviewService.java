package com.custom.service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.apache.commons.fileupload.FileItem;

import com.custom.dto.Section;

public class PreviewService {
	
	public static void preSaveFile(List<String> fileNames,String savePath,List<FileItem> fileItems) throws Exception{
		File f = new File(savePath);
		if(!f.exists()) f.mkdir();
		else {
			for (File file : f.listFiles()) {
				file.delete();
			}
		}
		for(int i = 0;i<fileNames.size();i++){
			// 上传文件
			File uploaderFile = new File(savePath+File.separatorChar+fileNames.get(i));
			fileItems.get(i).write(uploaderFile);
		}
	}

	public static void loadParamsImg(List<String> fileNames,List<Section> secs, Map<String,String> params) throws Exception{
		for(String s : fileNames){
			if(s.endsWith(".mp3")||s.endsWith(".ogg")||s.endsWith(".wav")) continue;
			Section sec = new Section();
			for(Field f : sec.getClass().getDeclaredFields()){
				String value = params.get(f.getName()+"-"+s);
				Method m = sec.getClass().getMethod("set"+f.getName().toUpperCase().charAt(0)+f.getName().substring(1),String.class);
				m.invoke(sec, value);
			}
			sec.setPicName("../../"+"customs/"+params.get("timeId")+"/"+sec.getPicName());
			secs.add(sec);
		}
	}

	public static void preSaveHtml(String path, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		RequestDispatcher rd = request.getRequestDispatcher("template/template.jsp");
		final ByteArrayOutputStream os = new ByteArrayOutputStream();
		final ServletOutputStream stream = new ServletOutputStream() {
			@Override
			public void write(byte[] data, int offset, int length) {
				os.write(data, offset, length);
			}
			@Override
			public void write(int b) throws IOException {
				os.write(b);
			}
		};
		final PrintWriter pw = new PrintWriter(new OutputStreamWriter(os,"UTF-8"));
		HttpServletResponse rep = new HttpServletResponseWrapper(response) {
			@Override
			public ServletOutputStream getOutputStream() {
				return stream;
			}
			@Override
			public PrintWriter getWriter() {
				return pw;
			}
		};
		rd.include(request, rep);
		pw.flush();
		File f = new File(path+File.separatorChar+"template.html");
		f.createNewFile();
		FileOutputStream fos = new FileOutputStream(path+File.separatorChar+"template.html"); // 把jsp输出的内容写到指定路径的htm文件中
		os.writeTo(fos);
		fos.close();
		response.reset();
	}
}
