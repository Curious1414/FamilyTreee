/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.ouri.tree;

import java.util.List;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ouri.tree.dao.FamilyRepo;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@Component
public class DatabasePersonLoader implements CommandLineRunner {

	private final FamilyRepo repository;

	@Autowired
	public DatabasePersonLoader(FamilyRepo repository) {
		this.repository = repository;
		System.out.println("DatabaseLoader FamilyRepo repository");
		
	}

	@Override
	public void run(String... strings) throws Exception {
		//this.repository.save(new Person("Eli", "Haviv"));
		//this.repository.getSingle(726);
		//this.repository.save(new Person("Nissim", "Haviv", new Integer[] {1,2,3}));
		//this.repository.
		System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%% Loading repository FamilyRepo");
	}
	
	/*
	public List<Person> getselected() {
		Session session = HibernateUtil.getHibernateSession();
		CriteriaBuilder cb = session.getCriteriaBuilder();
		CriteriaQuery<Person> cr = cb.createQuery(Person.class);
		Root<Person> root = cr.from(Person.class);
		cr.select(root);
		 
		Query<Person> query = session.createQuery(cr);
		List<Person> results = query.getResultList();
		return results;
	}
	*/
}
// end::code[]