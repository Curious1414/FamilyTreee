package com.ouri.tree.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.ouri.tree.Person;

public class FamilyRepoImpl implements FamilyRepoCustom{
	@PersistenceContext
	EntityManager em;
	
	@Override
	@Transactional
	public List<Person> getSelected(List<Integer> ids){
		System.out.println("getSelected "+ids);
		String param =""+ids;
		param =param.substring(1, param.length()-1);
		System.out.println("getSelected param "+param);
		
		return em.createQuery("from Person where id in ("+param+")").getResultList();
		//return new ArrayList<Person>();
	}
	
	public Person getSingle(Integer id) {
		Query q = em.createQuery("from Person where id="+id);
		System.out.println("In getSingle");
		return (Person)q.getSingleResult();
		//return new Person("Test", "Last", new Integer[] {1,2,3});
	}
	
	public List<Person> getPersonsByIds(List<Integer> ids){
		em.createQuery("from Person where id in :ids");
		return new ArrayList<Person>();
	}

}
