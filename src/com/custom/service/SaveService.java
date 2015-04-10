package com.custom.service;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Iterator;

import org.apache.commons.compress.archivers.ArchiveException;
import org.apache.commons.compress.archivers.ArchiveOutputStream;
import org.apache.commons.compress.archivers.ArchiveStreamFactory;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

public class SaveService {

	public static String saveWarFile(String path, String key,String demoPath) throws Exception{
		
		File targetFolder = new File(path,"ctbigdataApp");
		if(!targetFolder.exists()) targetFolder.mkdir();
		
		File customers = new File(path);
		File[] innerFiles = customers.listFiles(new FileFilter() {
			@Override
			public boolean accept(File file) {
				return !file.isDirectory();
			}
		});
		
		File tCus = new File(targetFolder, "customs/"+key);
		if(!tCus.exists()) tCus.mkdir();
		
		for (int i = 0; i < innerFiles.length; i++) {
			FileUtils.copyFileToDirectory(innerFiles[i], tCus);
		}
		
		File demo = new File(demoPath);
		File[] demoFolders = demo.listFiles(new FileFilter() {
			@Override
			public boolean accept(File file) {
				return file.getName().equals("css")||file.getName().equals("imgs")||file.getName().equals("js");
			}
		});
		
		File demoCus = new File(targetFolder, "template/demo");
		if(!demoCus.exists()) demoCus.mkdir();
		
		for (int i = 0; i < demoFolders.length; i++) {
			FileUtils.copyDirectoryToDirectory(demoFolders[i], demoCus);
		}
		
		File webXml = new File(demoPath+"/WEB-INF/web.xml");
		File xmlFolder = new File(targetFolder, "WEB-INF");
		if(!xmlFolder.exists()) xmlFolder.mkdir();		
		FileUtils.copyFileToDirectory(webXml, xmlFolder);
		
		File welJsp = new File(demo, "welcome.jsp");
		BufferedReader br=new BufferedReader(new FileReader(welJsp));
		String line="";
		StringBuffer buffer = new StringBuffer();
		while((line=br.readLine())!=null){
			buffer.append(line);
		}
		br.close();
		String fileContent = buffer.toString().replaceAll("SpecailHoder", key);
		OutputStreamWriter os = new FileWriter(welJsp);
		os.write(fileContent);
		os.close();
		os.close();
		
		FileUtils.copyFileToDirectory(welJsp, targetFolder);
		
		String destFile = path+"/ctbigdataApp.war";
		zip(destFile,path+"/ctbigdataApp");
		return destFile;
	}
	
    public static void zip(String destFile, String zipDir) {
        File outFile = new File(destFile);
        try {
            outFile.createNewFile();
            BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(outFile));
            ArchiveOutputStream out = new ArchiveStreamFactory().createArchiveOutputStream(ArchiveStreamFactory.JAR,
                    bufferedOutputStream);
 
            if (zipDir.charAt(zipDir.length() - 1) != '/') {
                zipDir += '/';
            }
 
            @SuppressWarnings("unchecked")
			Iterator<File> files = FileUtils.iterateFiles(new File(zipDir), null, true);
            while (files.hasNext()) {
                File file = files.next();
                ZipArchiveEntry zipArchiveEntry = new ZipArchiveEntry(file, file.getPath().replace(
                        zipDir.replace("/", "\\"), ""));
                out.putArchiveEntry(zipArchiveEntry);
                FileInputStream tmp = new FileInputStream(file);
                IOUtils.copy(tmp, out);
                out.closeArchiveEntry();
                tmp.close();
            }
            out.finish();
            bufferedOutputStream.close();
            out.close();
        } catch (IOException e) {
            System.err.println("创建文件失败");
        } catch (ArchiveException e) {
            System.err.println("不支持的压缩格式");
        }
    }

	public static void removeAll(String path) {
		File f = new File(path);
		try {
			FileUtils.deleteDirectory(f);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
