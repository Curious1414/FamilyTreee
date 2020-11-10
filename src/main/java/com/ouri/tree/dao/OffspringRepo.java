package com.ouri.tree.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="offsprings",path="offsprings")
public interface OffspringRepo extends JpaRepository<Offspring, Integer>{
	
	//public static final String FIND_CHILDREN = "select person_Id from Offspring where couple_Id=?1";

	//@Query(value = FIND_CHILDREN, nativeQuery = true)
	//@Query("select personId from Offsprings where coupleId=?1 ") 
	//List<Integer> findByCoupleId(Integer coupleId);
	
	//@Query("from Offsprings where coupleId=?1 ") 
		List<Offspring> findByCoupleId(Integer coupleId);
	  /*
	 * List<Person> findByFamilyNameGreaterThan(String familyName);
	 * 
	 * @Query("from Person where firstName=?1 Order by familyName") List<Person>
	 * findByFirstNameSorted(String firstName);
	 */
	
}
