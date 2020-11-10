package com.ouri.tree.dao;

/*import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;*/
 
//@Configuration
//@EnableTransactionManagement
public class HibernateConfiguration {
	/*
	@Value("${spring.datasource.driver-class-name}")
	private String DRIVER;
 
	@Value("${spring.datasource.password}")
	private String PASSWORD;
 
	@Value("${spring.datasource.url}")
	private String URL;
 
	@Value("${spring.datasource.username}")
	private String USERNAME;
 
	@Value("${spring.jpa.database-platform}")
	private String DIALECT;
 
	@Value("${hibernate.show_sql}")
	private String SHOW_SQL;
 
	@Value("${hibernate.hbm2ddl.auto}")
	private String HBM2DDL_AUTO;
 
	@Value("${entitymanager.packagesToScan}")
	private String PACKAGES_TO_SCAN;
 
	
	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(DRIVER);
		dataSource.setUrl(URL);
		dataSource.setUsername(USERNAME);
		dataSource.setPassword(PASSWORD);
		System.out.println("DRIVER "+DRIVER+", URL "+URL);
		return dataSource;
	}
 
	@Bean
	public LocalSessionFactoryBean sessionFactory() {
		LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
		sessionFactory.setDataSource(dataSource());
		sessionFactory.setPackagesToScan(PACKAGES_TO_SCAN);
		Properties hibernateProperties = new Properties();
		hibernateProperties.put("hibernate.dialect", DIALECT);
		hibernateProperties.put("hibernate.show_sql", SHOW_SQL);
		hibernateProperties.put("hibernate.hbm2ddl.auto", HBM2DDL_AUTO);
		sessionFactory.setHibernateProperties(hibernateProperties);
		System.out.println("DIALECT "+DIALECT+", SHOW_SQL "+SHOW_SQL);
		return sessionFactory;
	}
 
	@Bean
	public HibernateTransactionManager transactionManager() {
		HibernateTransactionManager transactionManager = new HibernateTransactionManager();
		transactionManager.setSessionFactory(sessionFactory().getObject());
		return transactionManager;
	}	
	
	/*
	@Bean
	   public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
	      LocalContainerEntityManagerFactoryBean em 
	        = new LocalContainerEntityManagerFactoryBean();
	      em.setDataSource(dataSource());
	      em.setPackagesToScan(new String[] { "com.ouri.tree", "com.ouri.tree.dao" });
	 
	      JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
	      em.setJpaVendorAdapter(vendorAdapter);
	      //em.setJpaProperties(additionalProperties());
	 
	      return em;
	   }
	   */
	/*
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(ComboPooledDataSource comboPooledDataSource) {
	    HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
	    LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
	    vendorAdapter.setDatabasePlatform("org.hibernate.dialect.MySQLDialect");
	    factory.setJpaVendorAdapter(vendorAdapter);
	    factory.setPackagesToScan("org.sharder.core.entity");
	    factory.setDataSource(comboPooledDataSource);
	    factory.setJpaProperties(getHibernateProperties());
	    return factory;
	}
	
	
	@Bean(name = "jpaTransactionManager")
	public PlatformTransactionManager jpaTransactionManager(EntityManagerFactory entityManagerFactory) {
	    JpaTransactionManager txManager = new JpaTransactionManager();
	    txManager.setEntityManagerFactory(entityManagerFactory);
	    return txManager;
	}

	private Properties getHibernateProperties() {
	    Properties properties = new Properties();
	    properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
	    properties.setProperty("hibernate.cache.region.factory_class", "org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory");
	    properties.setProperty("hibernate.cache.use_query_cache", "true");
	    properties.setProperty("hibernate.cache.use_second_level_cache", "true");
	    properties.setProperty("hibernate.cache.use_structured_entries", "true");
	    properties.setProperty("hibernate.format_sql", "true");
	    properties.setProperty("hibernate.show_sql", "true");
	    properties.setProperty("hibernate.use_sql_comments", "true");
	    properties.setProperty("hibernate.query.substitutions", "true 1, false 0");
	    properties.setProperty("hibernate.jdbc.fetch_size", "20");
	    properties.setProperty("hibernate.connection.autocommit", "false");
	    properties.setProperty("hibernate.connection.release_mode", "auto");
	    return properties;
	}
	*/
}
