package com.custom.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 *  Copyright 2015 CTBRI
 *  All right reserved.
 *	<p>Listen to the context and load the product directly.</p>
 * @author Ctbri
 * @Creat Time : 2015-3-29 Hequn 3:25:00
 * @ContextListener
 */
public class ContextListener implements ServletContextListener {

	public ContextListener() {

	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		
		loadResourceMap();
	}

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		
	}
	
	/**
	 * Load the product and start the file status tracker.
	 */
	public void loadResourceMap(){
		
	}
}
